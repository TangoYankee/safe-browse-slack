const threatsInCache = {
  'testsafebrowsing.appspot.com/s/phishing.html': { threatMatch: 'SOCIAL_ENGINEERING' },
  'testsafebrowsing.appspot.com/s/unwanted.html': { threatMatch: 'UNWANTED_SOFTWARE' },
  'testsafebrowsing.appspot.com/s/malware.html': { threatMatch: 'MALWARE' }
}

const threatsInCacheNone = {}

module.exports = {
  threatsInCache,
  threatsInCacheNone
}
