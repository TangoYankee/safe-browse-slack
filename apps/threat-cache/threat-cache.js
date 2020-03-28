'use strict'

const { cacheStart, cacheInstance } = require('./cache')

cacheStart()
const cache = cacheInstance()

class ThreatCache {
  report (urls) {
    return cache.mget(urls)
  }

  store (fromSafeBrowse) {
    return cache.mset(this._metaDataStore(fromSafeBrowse))
  }

  _metaDataStore (fromSafeBrowse) {
    /* cache-friendly data format */
    var storeMetaData = []
    for (var match of fromSafeBrowse) {
      storeMetaData.push({
        key: match.threat.url,
        val: {
          threatMatch: match.threatType
        },
        ttl: this._duration(match.cacheDuration)
      })
    }
    return storeMetaData
  }

  _duration (timeLetters) {
    /* convert time from text to number */
    var numberRegex = /[0-9]/g
    var numbers = timeLetters.match(numberRegex)
    var timeNumbers = numbers.join('')
    return parseInt(timeNumbers)
  }

  get clearData () {
    cache.flushAll()
    return cache.getStats()
  }

  get terminate () {
    cache.close()
  }
}

module.exports = ThreatCache
