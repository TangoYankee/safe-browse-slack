'use strict'

const { threatMap } = require('./threat-map')

const mockUrlDomainKeys = (threats) => {
  var urlDomainKeys = []
  for (var threat of threats) {
    urlDomainKeys.push(threatMap[threat].url)
  }
  return urlDomainKeys
}

const mockThreatEntries = (urlDomainKeys) => {
  var urlDomainKeysUnique = new Set(urlDomainKeys)
  var threatEntries = []
  for (var urlDomainKey of urlDomainKeysUnique) {
    threatEntries.push({ url: urlDomainKey })
  }
  return threatEntries
}

const mockRequestBody = (threatEntries) => {
  return {
    client: {
      clientId: process.env.GOOGLE_SAFE_BROWSING_CLIENT_ID,
      clientVersion: '1.5.2'
    },
    threatInfo: {
      platformTypes: ['ANY_PLATFORM'],
      threatEntries: threatEntries,
      threatEntryTypes: ['URL'],
      threatTypes: [
        'THREAT_TYPE_UNSPECIFIED',
        'MALWARE',
        'SOCIAL_ENGINEERING',
        'UNWANTED_SOFTWARE',
        'POTENTIALLY_HARMFUL_APPLICATION'
      ]
    }
  }
}

module.exports = {
  mockUrlDomainKeys,
  mockRequestBody,
  mockThreatEntries
}
