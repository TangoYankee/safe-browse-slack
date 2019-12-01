const { cacheStart, cacheInstance } = require('./cache')

cacheStart()
const cache = cacheInstance()

// TODO: 'inCache' Boolean value
const setCacheThreatTypes = (messageData, threatMatches) => {
  /* save threat matches to message object */
  // Look for every instance of the url
  return {
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
}

const getCacheThreats = (hyperTexts) => {
  /* previously encountered threats */
  var urlDomainKeys = setUrlDomainKeys(hyperTexts)
  return cache.mget(urlDomainKeys)
}

const setUrlDomainKeys = (hyperTexts) => {
  /* list of urls to look for in cache */
  var urlDomainKeys = []
  for (var hyperText of hyperTexts) {
    urlDomainKeys.push(hyperText.urlDomainKey)
  }
  return urlDomainKeys
}

const postCacheThreats = (hyperTexts) => {
  /* remember threats */
  var cacheThreats = setCacheThreats(hyperTexts)
  return cache.mset(cacheThreats)
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
    if (threatMatch) {
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
  return cacheThreats
}

module.exports = {
  setCacheThreatTypes,
  getCacheThreats,
  setUrlDomainKeys,
  postCacheThreats,
  setCacheDuration,
  setCacheThreats
}
