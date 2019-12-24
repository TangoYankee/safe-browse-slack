const { setAllHyperTextPositions, validHyperTextPositions } = require('./positions')
const {
  validateDestUrl, validateDisplayText, setSlackHyperText,
  setDestUrl, setDisplayText, getMarkdownHyperText, setAllSharedAsHttpSecure,
  setHttpDestUrl, setUrlDomainKey, setSharedAsHttpSecure
} = require('./content')
const { getCacheThreats, setCacheThreatTypes } = require('../cache/threats')
const { setSafeBrowseThreats, setSafeBrowseThreatTypes } = require('../safe-browse/safe-browse')

const setMessage = async(text, userId) => {
  var allHyperTextPositions = setAllHyperTextPositions(text)
  let messageData = setMessageData(text, userId)
  if (allHyperTextPositions) {
    messageData = setHyperText(messageData, allHyperTextPositions, text)
    messageData = setAllSharedAsHttpSecure(messageData)
    messageData = setCache(messageData)
    messageData = setSafeBrowse(messageData)
}
  return messageData
}

const setHyperText = (messageData, allHyperTextPositions, text) => {
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

const setCache = (messageData) => {
  var cacheThreats = getCacheThreats(messageData.links)
  messageData = setCacheThreatTypes(messageData, cacheThreats)
  return messageData
}

const setSafeBrowse = async (messageData) => {
  var safeBrowseThreats = await setSafeBrowseThreats(messageData.links)
  if (safeBrowseThreats) {
    messageData.safeBrowseSuccess = true
    messageData = setSafeBrowseThreatTypes(messageData, safeBrowseThreats)
  }
  return messageData
}

const setMessageData = (text, userId) => {
  return {
    message: text,
    sharedBy: userId,
    safeBrowseSuccess: false,
    allSharedAsHttpSecure: false,
    threatTypes: [],
    links: []
  }
}

const setHyperTextData = (markdownHyperText, slackHyperText, urlDomainKey, sharedAsHttpSecure) => {
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
  // hyperText,
  setMessage
  // setMasterMessage
}
