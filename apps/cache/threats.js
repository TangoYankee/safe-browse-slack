'use strict'

const { cacheStart, cacheInstance } = require('./cache')

cacheStart()
const cache = cacheInstance()

const setCacheThreatTypes = (messageData, threatMatches) => {
  /* save threat matches to message object */
  var theseThreatTypes = new Set(messageData.threatTypes)
  for (var urlDomainKey in threatMatches) {
    var threatMatch = threatMatches[urlDomainKey].threatMatch
    for (var link of messageData.links) {
      if (link.urlDomainKey === urlDomainKey) {
        link.threatMatch = threatMatch
        link.inCache = true
        theseThreatTypes.add(threatMatch)
      }
    }
  }
  messageData.threatTypes = [...theseThreatTypes]
  return messageData
}

const getCacheThreats = (hyperTexts) => {
  /* previously encountered threats */
  var urlDomainKeys = setUrlDomainKeys(hyperTexts)
  return cache.mget(urlDomainKeys)
}

const setUrlDomainKeys = (hyperTexts) => {
  /* list of urls to look for in cache */
  var urlDomainKeys = new Set()
  for (var hyperText of hyperTexts) {
    urlDomainKeys.add(hyperText.urlDomainKey)
  }
  return [...urlDomainKeys]
}

const postCacheThreats = (hyperTexts) => {
  /* remember threats */
  var cacheThreats = setCacheThreats(hyperTexts)
  if (cacheThreats.length > 0) {
    return cache.mset(cacheThreats)
  } else {
    return true
  }
}

const setCacheDuration = (cacheDurationUnits) => {
  /* string with units to integar */
  var numberRegex = /[0-9]/g
  var durationSplit = cacheDurationUnits.match(numberRegex)
  var durationJoined = durationSplit.join('')
  var cacheDuration = parseInt(durationJoined)
  return cacheDuration
}

const setCacheThreats = (hyperTexts) => {
  /* cache-friendly threat format */
  var cacheThreats = []
  for (var hyperText of hyperTexts) {
    var threatMatch = hyperText.threatMatch
    if (threatMatch && !hyperText.inCache) {
      var urlDomainKeyInCacheThreats = cacheThreats.find(cacheThreat => cacheThreat.key === hyperText.urlDomainKey)
      if (urlDomainKeyInCacheThreats === undefined) {
        cacheThreats.push(
          {
            key: hyperText.urlDomainKey,
            val: {
              threatMatch: hyperText.threatMatch
            },
            ttl: setCacheDuration(hyperText.cacheDuration)
          }
        )
      }
    }
  }
  return cacheThreats
}

const clearCache = () => {
  /* reset data */
  cache.flushAll()
}

module.exports = {
  setCacheThreatTypes,
  getCacheThreats,
  setUrlDomainKeys,
  postCacheThreats,
  setCacheDuration,
  setCacheThreats,
  clearCache
}
