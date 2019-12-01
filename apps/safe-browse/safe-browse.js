const process = require('process')
const postThreatMatches = require('./post-threat-matches')

const safeBrowse = (messageData, cacheThreats) => {
  /* scan urls for threats using Google safe browse 'lookup' API */
  var notInCache = setNotInCache(messageData.links, cacheThreats)
  var threatEntries = setThreatEntries(notInCache)
  var requestBody = setRequestBody(threatEntries)
  var threatMatches = postThreatMatches(requestBody)
  messageData.safeBrowseSuccess = true
  messageData = setThreatTypes(messageData, threatMatches)
  return messageData
}

// Function to determine which links were not found in the cache
const setNotInCache = (links, cacheThreats) => {
  /* threats not previously saved in cached */
  var notInCache = []
  for (link of links){
    var inCache = (cacheThreats.findIndex(cacheThreat => cacheThreat.key === link.urlDomainKey))
    if(inCache === -1){
      notInCache.push(link.urlDomainKey)
    }
  }
  return notInCache
}

// Change to only set links that are not in the cache already
const setThreatEntries = (links) => {
  /* pair urls with key for safe browse threat entries */
  var threatEntries = []
  for (var link of links) {
    threatEntries.push({ url: link.urlDomainKey })
  }
  return threatEntries
}

const setRequestBody = (threatEntries) => {
  /* pair threat entries urls with threat types to check */
  return {
    client: {
      clientId: process.env.GOOGLE_SAFE_BROWSING_CLIENT_ID,
      clientVersion: '1.5.2'
    },
    threatInfo: {
      threatTypes: ['THREAT_TYPE_UNSPECIFIED', 'MALWARE', 'SOCIAL_ENGINEERING', 'UNWANTED_SOFTWARE', 'POTENTIALLY_HARMFUL_APPLICATION'],
      platformTypes: ['ANY_PLATFORM'],
      threatEntryTypes: ['URL'],
      threatEntries: threatEntries
    }
  }
}

const setThreatTypes = (messageData, threatMatches) => {
  /* add threat type to the original message */
  for (var threatMatch of threatMatches.matches) {
    for (var link of messageData.links) {
      if (link.urlDomainKey === threatMatch.threat.url) {
        link.threatMatch = threatMatch.threatType
        link.cacheDuration = threatMatch.cacheDuration
        messageData.threatTypes.push(threatMatch.threatType)
      }
    }
  }
  return messageData
}

module.exports = {
  safeBrowse,
  setRequestBody,
  setThreatEntries,
  setThreatTypes,
  setNotInCache
}
