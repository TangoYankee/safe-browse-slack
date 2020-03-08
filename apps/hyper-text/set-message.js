'use strict'

const { setMessageData, setHyperTextData } = require('./message-object')
const {
  validateDestUrl, validateDisplayText, setSlackHyperText,
  setDestUrl, setDisplayText, getMarkdownHyperText,
  setAllSharedAsHttpSecure, setHttpDestUrl, setUrlDomainKey,
  setSharedAsHttpSecure, getRawMarkdownHyperTexts
} = require('./content')
const { getCacheThreats, setCacheThreatTypes, postCacheThreats } = require('../cache/threats')

const { setSafeBrowseThreatTypes } = require('../safe-browse/threat-types')
const { SafeBrowse } = require('../safe-browse/safe-browse')
const { setUncachedUrlDomainKeys } = require('../safe-browse/uncached-urls')

const setMessage = async (text, userId) => {
  /* organize metadata and search for suspected threats from urls */
  let messageData = setMessageData(text, userId)
  messageData = setHyperText(messageData, text)
  messageData = setAllSharedAsHttpSecure(messageData)
  messageData = getCache(messageData)
  messageData = await setSafeBrowse(messageData)
  if (messageData.links.length > 0) {
    var postCacheThreatsStatus = postCacheThreats(messageData.links)
    if (postCacheThreatsStatus === false) {
      console.error('error saving to cache')
    }
  }
  messageData = setNoneFound(messageData)
  return messageData
}

const setHyperText = (messageData, text) => {
  /* destination urls, display text, and their meta data */
  var rawMarkdownHyperTexts = getRawMarkdownHyperTexts(text)
  if (rawMarkdownHyperTexts !== null) {
    for (var rawMarkdownHyperText of rawMarkdownHyperTexts) {
      var markdownHyperText = getMarkdownHyperText(rawMarkdownHyperText)
      var displayText = setDisplayText(markdownHyperText)
      var destUrl = setDestUrl(markdownHyperText)
      if (validateDisplayText(displayText) && validateDestUrl(destUrl)) {
        var urlDomainKey = setUrlDomainKey(destUrl)
        var sharedAsHttpSecure = setSharedAsHttpSecure(destUrl)
        var httpDestUrl = setHttpDestUrl(destUrl)
        var slackHyperText = setSlackHyperText(httpDestUrl, displayText)
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
  if (cacheThreats === undefined) {
    console.error('error retrieving cache values')
  } else {
    messageData = setCacheThreatTypes(messageData, cacheThreats)
  }
  return messageData
}

const setSafeBrowse = async (messageData) => {
  /* check whether url is a suspected threat by google safe browse api */
  var uncachedUrlDomainKeys = setUncachedUrlDomainKeys(messageData.links)
  var safeBrowse = new SafeBrowse(uncachedUrlDomainKeys)
  var safeBrowseThreats = await safeBrowse.threatMatches
  if (safeBrowseThreats.message !== undefined) {
    messageData.safeBrowseSuccess = false
  } else {
    messageData.safeBrowseSuccess = true
    messageData = setSafeBrowseThreatTypes(messageData, safeBrowseThreats)
  }
  return messageData
}

const setNoneFound = (messageData) => {
  /* identify if there are links that are not suspected of threats */
  for (var link of messageData.links) {
    if (link.threatMatch === '') {
      var noneFoundInThreatTypes = messageData.threatTypes.includes('NONE_FOUND')
      if (!noneFoundInThreatTypes) {
        messageData.threatTypes.push('NONE_FOUND')
      }
    }
  }
  return messageData
}

module.exports = {
  setMessage,
  setHyperText,
  getCache,
  setSafeBrowse,
  setNoneFound
}
