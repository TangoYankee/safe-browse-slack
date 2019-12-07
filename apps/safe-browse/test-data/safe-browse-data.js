const threatEntries = [
  { url: 'testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/' },
  { url: 'testsafebrowsing.appspot.com/s/malware.html' },
  { url: 'nasa.gov' }
]

const urlDomainKeys = [
  {
    urlDomainKey: 'testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/',
    cacheDuration: '300s',
    inCache: false,
    markdownLink: '[Social Engineering Site](https://testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/)',
    messageLink: '<https://testsafebrowsing.appspot.com/apiv4/osx/sociakl_engineering/url/|Social Engineering Site>',
    sharedAsHttpSecure: true,
    threatMatch: 'SOCIAL_ENGINEERING'
  },
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

const requestBody = {
  client: {
    clientId: process.env.GOOGLE_SAFE_BROWSING_CLIENT_ID,
    clientVersion: '1.5.2'
  },
  threatInfo: {
    platformTypes: ['ANY_PLATFORM'],
    threatEntries: [
      { url: 'testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/' },
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
  message: '[Social Engineering Site](https://testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/), [Malware Site](testsafebrowsing.appspot.com/s/malware.html), and [Nasa](nasa.gov)',
  sharedBy: 'TangoYankee',
  safeBrowseSuccess: true,
  allSharedAsHttpSecure: false,
  threatTypes: [],
  links: [
    {
      urlDomainKey: 'testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/',
      cacheDuration: '',
      inCache: false,
      markdownLink: '[Social Engineering Site](https://testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/)',
      messageLink: '<https://testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/|Social Engineering Site>',
      sharedAsHttpSecure: true,
      threatMatch: ''
    },
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

// const notInCache = [
//   'testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/',
//   'nasa.gov'
// ]

const outputMessageData = {
  message: '[Social Engineering Site](https://testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/), [Malware Site](testsafebrowsing.appspot.com/s/malware.html), and [Nasa](nasa.gov)',
  sharedBy: 'TangoYankee',
  safeBrowseSuccess: true,
  allSharedAsHttpSecure: false,
  threatTypes: [
    'MALWARE'
  ],
  links: [
    {
      urlDomainKey: 'testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/',
      cacheDuration: '',
      inCache: false,
      markdownLink: '[Social Engineering Site](https://testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/)',
      messageLink: '<https://testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/|Social Engineering Site>',
      sharedAsHttpSecure: true,
      threatMatch: ''
    },
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
