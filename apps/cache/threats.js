'use strict'

const { cacheStart, cacheInstance } = require('./cache')

cacheStart()
// const cache = cacheInstance()

class ThreatCache {
  constructor(uncheckedHypertexts) {
    this.cache = cacheInstance()
    this.uncheckedHypertexts = uncheckedHypertexts
    this.urlDomainKeys = this.setUrlDomainKeys()
  }

  setUrlDomainKeys = () => {
    /* list of urls to look for in cache */
    incomingUrlDomainKeys = []
    for (var hypertext of this.uncheckedHypertexts) {
      try {
        incomingUrlDomainKeys.push(hypertext.urlDomainKey)
      }
      catch(error){
        throw error
      }
    } 
    return incomingUrlDomainKeys
  }

  getCacheThreats = () => {
    /* previously encountered threats */
    try{
      return this.cache.mget(this.urlDomainKeys)
    } catch (error) {
      return error
    }
  }

  postCacheThreats = (checkedThreatUrls) => {
    /* remember threats */
    try {
      return this.cache.mset(this.formatThreatUrls(checkedThreatUrls))
    } catch (error) {
      return error
    }
  }

  formatThreatUrls = (checkedThreatUrls) => {
    /* cache-friendly threat format */
    var incomingThreatUrls = []
    for (var hypertext of checkedThreatUrls) {
      var threatMatch = hypertext.threatMatch
      if (threatMatch && !hypertext.inCache) {
        var urlDomainKeyInCacheThreats = incomingThreatUrls.find(cacheThreat => cacheThreat.key === hypertext.urlDomainKey)
        if (urlDomainKeyInCacheThreats === undefined) {
          incomingThreatUrls.push(
            {
              key: hypertext.urlDomainKey,
              val: {
                threatMatch: hypertext.threatMatch
              },
              ttl: this.setCacheDuration(hypertext.cacheDuration)
            }
          )
        }
      }
    }
    return incomingThreatUrls
  }

  setCacheDuration = (cacheDurationUnits) => {
    /* string with units to integer */
    var numberRegex = /[0-9]/g
    var durationSplit = cacheDurationUnits.match(numberRegex)
    var durationJoined = durationSplit.join('')
    var cacheDuration = parseInt(durationJoined)
    return cacheDuration
  }

  clearCache = () => {
    /* reset data */
    this.cache.flushAll()
  }
}


// Property of message object
// const setCacheThreatTypes = (messageData, threatMatches) => {
//   /* save threat matches to message object */
//   for (var urlDomainKey in threatMatches) {
//     var threatMatch = threatMatches[urlDomainKey].threatMatch
//     for (var link of messageData.links) {
//       if (link.urlDomainKey === urlDomainKey) {
//         link.threatMatch = threatMatch
//         link.inCache = true
//         var threatMatchInThreatTypes = messageData.threatTypes.includes(threatMatch)
//         if (!threatMatchInThreatTypes) {
//           messageData.threatTypes.push(threatMatch)
//         }
//       }
//     }
//   }
//   return messageData
// }

// const getCacheThreats = (hyperTexts) => {
//   /* previously encountered threats */
//   var urlDomainKeys = setUrlDomainKeys(hyperTexts)
//   return cache.mget(urlDomainKeys)
// }

// const setUrlDomainKeys = (hyperTexts) => {
//   /* list of urls to look for in cache */
//   var urlDomainKeys = []
//   for (var hyperText of hyperTexts) {
//     var urlDomainKeyInUrlDomainKeys = urlDomainKeys.includes(hyperText.urlDomainKey)
//     if (!urlDomainKeyInUrlDomainKeys) {
//       urlDomainKeys.push(hyperText.urlDomainKey)
//     }
//   }
//   return urlDomainKeys
// }

// const postCacheThreats = (hyperTexts) => {
//   /* remember threats */
//   var cacheThreats = setCacheThreats(hyperTexts)
//   if (cacheThreats.length > 0) {
//     return cache.mset(cacheThreats)
//   } else {
//     return true
//   }
// }

// const setCacheDuration = (cacheDurationUnits) => {
//   /* string with units to integer */
//   var numberRegex = /[0-9]/g
//   var durationSplit = cacheDurationUnits.match(numberRegex)
//   var durationJoined = durationSplit.join('')
//   var cacheDuration = parseInt(durationJoined)
//   return cacheDuration
// }

// const setCacheThreats = (hyperTexts) => {
//   /* cache-friendly threat format */
//   var cacheThreats = []
//   for (var hyperText of hyperTexts) {
//     var threatMatch = hyperText.threatMatch
//     if (threatMatch && !hyperText.inCache) {
//       var urlDomainKeyInCacheThreats = cacheThreats.find(cacheThreat => cacheThreat.key === hyperText.urlDomainKey)
//       if (urlDomainKeyInCacheThreats === undefined) {
//         cacheThreats.push(
//           {
//             key: hyperText.urlDomainKey,
//             val: {
//               threatMatch: hyperText.threatMatch
//             },
//             ttl: setCacheDuration(hyperText.cacheDuration)
//           }
//         )
//       }
//     }
//   }
//   return cacheThreats
// }

// const clearCache = () => {
//   /* reset data */
//   cache.flushAll()
// }

module.exports = {
  ThreatCache
}
