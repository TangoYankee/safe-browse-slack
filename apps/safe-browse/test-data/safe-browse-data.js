const threatEntries = [
  { url: 'testsafebrowsing.appspot.com/s/malware.html' },
  { url: 'nasa.gov' }
]

const urlDomainKeys = [
  {
    urlDomainKey: 'testsafebrowsing.appspot.com/s/malware.html',
    cacheDuration: '300s',
    inCache: false,
    markdownLink: '[Malware Site](testsafebrowsing.appspot.com/s/malware.html)',
    messageLink: '<https://testsafebrowsing.appspot.com/s/malware.html|Malware Site>',
    sharedAsHttpSecure: false,
    threatMatch: 'MALWARE'
  },
  {
    urlDomainKey: 'nasa.gov',
    cacheDuration: '',
    inCache: false,
    markdownLink: '[Nasa](nasa.gov)',
    messageLink: '<https://nasa.gov|Nasa>',
    sharedAsHttpSecure: false,
    threatMatch: ''
  }
]

/*
'{ "client": {"clientId": "markdownlinks", "clientVersion": "1.5.2" }, "threatInfo": { "platformTypes": ["ANY_PLATFORM"], "threatEntries": [ { "url": "https://testsafebrowsing.appspot.com/s/phishing.html" },{"url": "https://testsafebrowsing.appspot.com/s/unwanted.html"}, { "url": "testsafebrowsing.appspot.com/s/malware.html" }, { "url": "nasa.gov" }], "threatEntryTypes": ["URL"], "threatTypes": [ "THREAT_TYPE_UNSPECIFIED", "MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION" ] } }' -H "Content-Type: application/json" -X POST https://safebrowsing.googleapis.com/v4/threatMatches:find?key="
*/
const requestBody = {
  client: {
    clientId: process.env.GOOGLE_SAFE_BROWSING_CLIENT_ID,
    clientVersion: '1.5.2'
  },
  threatInfo: {
    platformTypes: ['ANY_PLATFORM'],
    threatEntries: [
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

const inputMessageData = {
  message: '[Malware Site](testsafebrowsing.appspot.com/s/malware.html) and [Nasa](nasa.gov)',
  sharedBy: 'TangoYankee',
  safeBrowseSuccess: true,
  allSharedAsHttpSecure: false,
  threatTypes: [],
  links: [
    {
      urlDomainKey: 'testsafebrowsing.appspot.com/s/malware.html',
      cacheDuration: '',
      inCache: false,
      markdownLink: '[Malware Site](testsafebrowsing.appspot.com/s/malware.html)',
      messageLink: '<https://testsafebrowsing.appspot.com/s/malware.html|Malware Site>',
      sharedAsHttpSecure: false,
      threatMatch: ''
    },
    {
      urlDomainKey: 'nasa.gov',
      cacheDuration: '',
      inCache: false,
      markdownLink: '[Nasa](nasa.gov)',
      messageLink: '<https://nasa.gov|Nasa>',
      sharedAsHttpSecure: false,
      threatMatch: ''
    }
  ]
}

const cacheThreats = [
  {
    key: 'testsafebrowsing.appspot.com/s/malware.html',
    val: { threatMatch: 'MALWARE' },
    ttl: 300
  }
]

const outputMessageData = {
  message: '[Malware Site](testsafebrowsing.appspot.com/s/malware.html) and [Nasa](nasa.gov)',
  sharedBy: 'TangoYankee',
  safeBrowseSuccess: true,
  allSharedAsHttpSecure: false,
  threatTypes: [
    'MALWARE'
  ],
  links: [
    {
      urlDomainKey: 'testsafebrowsing.appspot.com/s/malware.html',
      cacheDuration: '300s',
      inCache: false,
      markdownLink: '[Malware Site](testsafebrowsing.appspot.com/s/malware.html)',
      messageLink: '<https://testsafebrowsing.appspot.com/s/malware.html|Malware Site>',
      sharedAsHttpSecure: false,
      threatMatch: 'MALWARE'
    },
    {
      urlDomainKey: 'nasa.gov',
      cacheDuration: '',
      inCache: false,
      markdownLink: '[Nasa](nasa.gov)',
      messageLink: '<https://nasa.gov|Nasa>',
      sharedAsHttpSecure: false,
      threatMatch: ''
    }
  ]
}

module.exports = {
  threatEntries,
  cacheThreats,
  urlDomainKeys,
  requestBody,
  inputMessageData,
  outputMessageData
}
