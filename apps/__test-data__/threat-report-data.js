'use strict'

class threatReportData {
  constructor (urls) {
    this.urls = urls
    this.userSubmittedUrls = {
      'testsafebrowsing.appspot.com/s/phishing.html': {},
      'testsafebrowsing.appspot.com/s/unwanted.html': {},
      'testsafebrowsing.appspot.com/s/malware.html': {},
      'nasa.gov': {}
    }

    this.urlsInCache = {
      'testsafebrowsing.appspot.com/s/malware.html': { threatMatch: 'MALWARE' },
      'testsafebrowsing.appspot.com/s/phishing.html': { threatMatch: 'SOCIAL_ENGINEERING' }
    }

    // this.forCacheStore = {
    //   'testsafebrowsing.appspot.com/s/phishing.html': {
    //     threatMatch: 'SOCIAL_ENGINEERING',
    //     cacheDuration: 300
    //   },
    //   'testsafebrowsing.appspot.com/s/malware.html': {
    //     threatMatch: 'MALWARE',
    //     cacheDuration: 300
    //   }
    // }

    this.forCacheStore = [
      {
        threatType: 'SOCIAL_ENGINEERING',
        platformType: 'ANY_PLATFORM',
        threat: {
          url: 'testsafebrowsing.appspot.com/s/phishing.html'
        },
        cacheDuration: '300s',
        threatEntryType: 'URL'
      },
      {
        threatType: 'MALWARE',
        platformType: 'ANY_PLATFORM',
        threat: {
          url: 'testsafebrowsing.appspot.com/s/malware.html'
        },
        cacheDuration: '300s',
        threatEntryType: 'URL'
      }
    ]

    this.cacheFriendly = [{
      key: 'testsafebrowsing.appspot.com/s/phishing.html',
      val: {
        threatMatch: 'SOCIAL_ENGINEERING'
      },
      ttl: 300
    },
    {
      key: 'testsafebrowsing.appspot.com/s/malware.html',
      val: {
        threatMatch: 'MALWARE'
      },
      ttl: 300
    }]
  }
}

module.exports = threatReportData
