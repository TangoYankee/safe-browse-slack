const hyperTexts = [
  {
    urlDomainKey: 'testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/',
    cacheDuration: '',
    inCache: false, // default value
    markdownLink: '[Social Engineering Site](https://testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/)',
    messageLink: '<https://testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/|Social Engineering Site>',
    sharedAsHttpSecure: true,
    threatMatch: ''
  },
  {
    urlDomainKey: 'testsafebrowsing.appspot.com/s/malware.html',
    cacheDuration: '',
    inCache: false, // default value
    markdownLink: '[Malware Site](testsafebrowsing.appspot.com/s/malware.html)',
    messageLink: '<https://testsafebrowsing.appspot.com/s/malware.html|Malware Site>',
    sharedAsHttpSecure: false,
    threatMatch: ''
  },
  {
    urlDomainKey: 'nasa.gov',
    cacheDuration: '',
    inCache: false, // default value
    markdownLink: '[Nasa](nasa.gov)',
    messageLink: '<https://nasa.gov|Nasa>',
    sharedAsHttpSecure: false,
    threatMatch: ''
  }
]

const urlDomainKeys = [
  'testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/',
  'testsafebrowsing.appspot.com/s/malware.html',
  'nasa.gov'
]

const hyperTextThreats = [
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

const cacheThreats = [
  {
    key: 'testsafebrowsing.appspot.com/s/malware.html',
    val: { threatMatch: 'MALWARE' },
    ttl: 300
  }
]

const cacheThreatsResponse = {
  'testsafebrowsing.appspot.com/s/malware.html': { threatMatch: 'MALWARE' }
}

const cacheDurationUnits = '300s'
const cacheDuration = 300

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
      inCache: false, // default value
      markdownLink: '[Social Engineering Site](https://testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/)',
      messageLink: '<https://testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/|Social Engineering Site>',
      sharedAsHttpSecure: true,
      threatMatch: ''
    },
    {
      urlDomainKey: 'testsafebrowsing.appspot.com/s/malware.html',
      cacheDuration: '',
      inCache: false, // default value
      markdownLink: '[Malware Site](testsafebrowsing.appspot.com/s/malware.html)',
      messageLink: '<https://testsafebrowsing.appspot.com/s/malware.html|Malware Site>',
      sharedAsHttpSecure: false,
      threatMatch: ''
    },
    {
      urlDomainKey: 'nasa.gov',
      cacheDuration: '',
      inCache: false, // default value
      markdownLink: '[Nasa](nasa.gov)',
      messageLink: '<https://nasa.gov|Nasa>',
      sharedAsHttpSecure: false,
      threatMatch: ''
    }
  ]
}

var messageThreatData = {
  message: '[Social Engineering Site](https://testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/), [Malware Site](testsafebrowsing.appspot.com/s/malware.html), and [Nasa](nasa.gov)',
  sharedBy: 'TangoYankee',
  safeBrowseSuccess: true,
  allSharedAsHttpSecure: false,
  threatTypes: [
    'MALWARE'
  ],
  links: [
    {
      cacheKeyFromUrl: 'testsafebrowsing.appspot.com/apiv4/osx/social_engineering/url/',
      cacheDuration: '',
      inCache: false, // default value
      markdownLink: '[Social Engineering Site](https://testsafebrowsing.appspot.com/apiv4/OSX/SOCIAL_ENGINEERING/URL/)',
      messageLink: '<https://testsafebrowsing.appspot.com/apiv4/osx/sociakl_engineering/url/|Social Engineering Site>',
      sharedAsHttpSecure: true,
      threatMatch: ''
    },
    {
      cacheKeyFromUrl: 'testsafebrowsing.appspot.com/s/malware.html',
      cacheDuration: '', // no value recieved when already in cache
      inCache: true,
      markdownLink: '[Malware Site](testsafebrowsing.appspot.com/s/malware.html)',
      messageLink: '<https://testsafebrowsing.appspot.com/s/malware.html|Malware Site>',
      sharedAsHttpSecure: false,
      threatMatch: 'MALWARE'
    },
    {
      cacheKeyFromUrl: 'nasa.gov',
      cacheDuration: '',
      inCache: false, // default value
      markdownLink: '[Nasa](nasa.gov)',
      messageLink: '<https://nasa.gov|Nasa>',
      sharedAsHttpSecure: false,
      threatMatch: ''
    }
  ]
}

module.exports = {
  hyperTexts,
  urlDomainKeys,
  hyperTextThreats,
  cacheThreats,
  cacheThreatsResponse,
  cacheDurationUnits,
  cacheDuration,
  inputMessageData,
  messageThreatData
}
