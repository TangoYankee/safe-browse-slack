const process = require('process')
const { postThreatMatches } = require('./post-threat-matches')

// Create test case... request error
// Possibly achieved by making domain url error and 403
const setSafeBrowseThreats = async (messageLinks) => {
  /* find suspected threats in safe browse API */
  var uncachedThreatEntries = setUncachedThreatEntries(messageLinks)
  var uncachedThreatEntriesExist = setUncachedThreatEntriesExist(uncachedThreatEntries)
  if (uncachedThreatEntriesExist) {
    var requestBody = setRequestBody(uncachedThreatEntries)
    var threatMatches = await postThreatMatches(requestBody)
    console.log(`threat matches... ${threatMatches}`)
    return threatMatches
  } else {
    return undefined
  }
}

const setUncachedThreatEntriesExist = (uncachedThreatEntries) => {
  /* prevent unnecessary calls to the SafeBrowse API, where there are no uncached threat urls */
  if (uncachedThreatEntries.length >= 1) {
    return true
  } else {
    return false
  }
}

const setUncachedThreatEntries = (links) => {
  /* pair urls with key for safe browse threat entries */
  var uncachedThreatEntries = []
  for (var link of links) {
    if (!link.inCache) {
      var threatEntryInArray = uncachedThreatEntries.find(threatEntry => threatEntry.url === link.urlDomainKey)
      if (threatEntryInArray === undefined) {
        uncachedThreatEntries.push({ url: link.urlDomainKey })
      }
    }
  }
  return uncachedThreatEntries
}

const setRequestBody = (uncachedThreatEntries) => {
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
      threatEntries: uncachedThreatEntries
    }
  }
}

const setSafeBrowseThreatTypes = (messageData, threatMatches) => {
  /* add threat type to the original message */
  if (threatMatches.matches) {
    for (var threatMatch of threatMatches.matches) {
      for (var link of messageData.links) {
        if (link.urlDomainKey === threatMatch.threat.url) {
          link.threatMatch = threatMatch.threatType
          link.cacheDuration = threatMatch.cacheDuration
          link.inCache = false
          var threatMatchInThreatTypes = messageData.threatTypes.includes(threatMatch.threatType)
          if (!threatMatchInThreatTypes) {
            messageData.threatTypes.push(threatMatch.threatType)
          }
        }
      }
    }
  }
  return messageData
}

const setThreatTypes = (messageData, threatMatches) => {
  /* add threat type to the original message */
  for (var threatMatch of threatMatches.matches) {
    for (var link of messageData.links) {
      if (link.urlDomainKey === threatMatch.threat.url) {
        link.threatMatch = threatMatch.threatType
        link.cacheDuration = threatMatch.cacheDuration
        link.inCache = false
        var threatMatchInThreatTypes = messageData.threatTypes.includes(threatMatch.threatType)
        if (!threatMatchInThreatTypes) {
          messageData.threatTypes.push(threatMatch.threatType)
        }
      }
    }
  }
  return messageData
}

module.exports = {
  setSafeBrowseThreats,
  setRequestBody,
  setUncachedThreatEntries,
  setUncachedThreatEntriesExist,
  setThreatTypes,
  setSafeBrowseThreatTypes
}
