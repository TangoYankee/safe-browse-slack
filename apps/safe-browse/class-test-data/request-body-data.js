'use strict'

const {threatMap} = require('../class-test-data/threat-map')

const mockUrlDomainKeys = (threats)  => {
  var urlDomainKeys = []
  for (var threat of threats){
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

const requestBodyOne = {
  client: {
    clientId: process.env.GOOGLE_SAFE_BROWSING_CLIENT_ID,
    clientVersion: '1.5.2'
  },
  threatInfo: {
    platformTypes: ['ANY_PLATFORM'],
    threatEntries: [
      { url: 'testsafebrowsing.appspot.com/s/phishing.html' },
      { url: 'testsafebrowsing.appspot.com/s/unwanted.html' },
      { url: 'testsafebrowsing.appspot.com/s/malware.html' },
      { url: 'nasa.gov' }
    ],
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

const requestBodyTwo = {
  client: {
    clientId: process.env.GOOGLE_SAFE_BROWSING_CLIENT_ID,
    clientVersion: '1.5.2'
  },
  threatInfo: {
    platformTypes: ['ANY_PLATFORM'],
    threatEntries: [
      { url: 'testsafebrowsing.appspot.com/s/unwanted.html' },
      { url: 'testsafebrowsing.appspot.com/s/malware.html' },
      { url: 'nasa.gov' }
    ],
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

const requestBodyThree = {
  client: {
    clientId: process.env.GOOGLE_SAFE_BROWSING_CLIENT_ID,
    clientVersion: '1.5.2'
  },
  threatInfo: {
    platformTypes: ['ANY_PLATFORM'],
    threatEntries: [
      { url: 'nasa.gov' }
    ],
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

const requestBodyFour = {
  client: {
    clientId: process.env.GOOGLE_SAFE_BROWSING_CLIENT_ID,
    clientVersion: '1.5.2'
  },
  threatInfo: {
    platformTypes: ['ANY_PLATFORM'],
    threatEntries: [
      { url: 'testsafebrowsing.appspot.com/s/unwanted.html' },
      { url: 'testsafebrowsing.appspot.com/s/malware.html' },
      { url: 'nasa.gov' }
    ],
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

const requestBodyFive = {
  client: {
    clientId: process.env.GOOGLE_SAFE_BROWSING_CLIENT_ID,
    clientVersion: '1.5.2'
  },
  threatInfo: {
    platformTypes: ['ANY_PLATFORM'],
    threatEntries: [
      { url: 'testsafebrowsing.appspot.com/s/unwanted.html' },
      { url: 'testsafebrowsing.appspot.com/s/malware.html' },
      { url: 'nasa.gov' },
      { url: 'error.io' }
    ],
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

module.exports = {
  mockUrlDomainKeys,
  mockRequestBody,
  mockThreatEntries
}
