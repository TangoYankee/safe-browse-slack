const { setAllHyperTextPositions, validHyperTextPositions } = require('./positions')
const {
  validateDestUrl, validateDisplayText, setSlackHyperText,
  setDestUrl, setDisplayText, getMarkdownHyperText, setAllSharedAsHttpSecure,
  setHttpDestUrl, setUrlDomainKey, setSharedAsHttpSecure
} = require('./content')
const { getCacheThreats, setCacheThreatTypes, postCacheThreats } = require('../cache/threats')
const { setSafeBrowseThreats, setSafeBrowseThreatTypes } = require('../safe-browse/safe-browse')

const setMessage = async (text, userId) => {
  /* organize metadata and search for suspected threats from urls */
  var allHyperTextPositions = setAllHyperTextPositions(text)
  let messageData = setMessageData(text, userId)
  if (allHyperTextPositions) {
    messageData = setHyperText(messageData, allHyperTextPositions, text)
    messageData = setAllSharedAsHttpSecure(messageData)
    messageData = getCache(messageData)
    messageData = await setSafeBrowse(messageData)
    if (messageData.links){
      postCacheThreats(messageData.links)
    }
  }
  return messageData
}

const setHyperText = (messageData, allHyperTextPositions, text) => {
  /* destination urls, display text, and their meta data */
  for (var hyperTextPosition of allHyperTextPositions) {
    if (validHyperTextPositions(hyperTextPosition)) {
      var displayText = setDisplayText(hyperTextPosition, text)
      var destUrl = setDestUrl(hyperTextPosition, text)
      if (validateDisplayText(displayText) && validateDestUrl(destUrl)) {
        var urlDomainKey = setUrlDomainKey(destUrl)
        var sharedAsHttpSecure = setSharedAsHttpSecure(destUrl)
        var httpDestUrl = setHttpDestUrl(destUrl)
        var slackHyperText = setSlackHyperText(httpDestUrl, displayText)
        var markdownHyperText = getMarkdownHyperText(hyperTextPosition, text)
        var hyperTextData = setHyperTextData(markdownHyperText, slackHyperText, urlDomainKey, sharedAsHttpSecure)
        messageData.links.push(hyperTextData)
      }
    }
  }
  return messageData
}

const getCache = (messageData) => {
  /* reference threat urls that are already saved locally */
  var cacheThreats = getCacheThreats(messageData.links)
  messageData = setCacheThreatTypes(messageData, cacheThreats)
  return messageData
}

const setSafeBrowse = async (messageData) => {
  /* check whether url is a suspected threat by google safe browse api */
  var safeBrowseThreats = await setSafeBrowseThreats(messageData.links)
  if (safeBrowseThreats) {
    messageData.safeBrowseSuccess = true
    messageData = setSafeBrowseThreatTypes(messageData, safeBrowseThreats)
  }
  return messageData
}

// Separate File
const setMessageData = (text, userId) => {
  /* message with meta data stored in an object */
  return {
    message: text,
    sharedBy: userId,
    safeBrowseSuccess: false,
    allSharedAsHttpSecure: false,
    threatTypes: [],
    links: []
  }
}

// Separate File
const setHyperTextData = (markdownHyperText, slackHyperText, urlDomainKey, sharedAsHttpSecure) => {
  /* each link and its meta data stored in an object */
  return {
    urlDomainKey: urlDomainKey,
    cacheDuration: '',
    inCache: false,
    markdownLink: markdownHyperText,
    messageLink: slackHyperText,
    sharedAsHttpSecure: sharedAsHttpSecure,
    threatMatch: ''
  }
}

module.exports = {
  setMessage,
  setHyperText,
  getCache,
  setSafeBrowse
}
