'use strict'

const { Message } = require('./message')
const { ThreatCache } = require('../cache/threats')
const { SafeBrowse } = require('../safe-browse/safe-browse')

const setMessage = async (text, userId) => {
  /* organize metadata and search for suspected threats from urls */
  var message = new Message(text, userId)
  var threatCache = new ThreatCache(message.hypertexts)
  var inCacheThreatMatches = threatCache.getCacheThreats()
  message.getInCacheThreatMatches(inCacheThreatMatches)
  var safeBrowse = new SafeBrowse(message.hypertexts)
  var safeBrowseThreatMatches = await safeBrowse.getSafeBrowseThreats()
  if (safeBrowseThreatMatches !== undefined) {
    if (safeBrowseThreatMatches === 'error') {
      message.safeBrowseSuccess = false
    } else {
      message.safeBrowseSuccess = true
      message.setSafeBrowseThreatMatches(safeBrowseThreatMatches)
    }
  }
  threatCache.postCacheThreats(message.hypertexts)
  return message
}

module.exports = {
  setMessage
}
