'use strict'

const { cacheStart, cacheInstance } = require('../cache/cache')

cacheStart()
const cache = cacheInstance()

class ThreatCache {
  report (urls) {
    return cache.mget(this._metaDataReport(urls))
  }

  _metaDataReport (urls) {
    return Object.keys(urls)
  }

  store (forCacheThreatReport) {
    return cache.mset(this._metaDataStore(forCacheThreatReport))
  }

  // Move to threat report object
  _duration (timeLetters) {
    /* convert time from text to number */
    var numberRegex = /[0-9]/g
    var numbers = timeLetters.match(numberRegex)
    var timeNumbers = numbers.join('')
    return parseInt(timeNumbers)
  }

  _metaDataStore (forCacheThreatReport) {
    /* cache-friendly data format */
    var storeMetaData = []
    for (var [urlKey, value] of Object.entries(forCacheThreatReport)) {
      storeMetaData.push({
        key: urlKey,
        val: {
          threatMatch: value.threatMatch
        },
        ttl: value.cacheDuration
      })
    }
    return storeMetaData
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
