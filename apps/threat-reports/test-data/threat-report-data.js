'use strict'

const { threatMap } = require('./threat-map')

class threatReportData {
  constructor (urls) {
    this.urls = urls
    // this.userSubmittedUrls = {
    //   'testsafebrowsing.appspot.com/s/phishing.html': {},
    //   'testsafebrowsing.appspot.com/s/unwanted.html': {},
    //   'testsafebrowsing.appspot.com/s/malware.html': {},
    //   'nasa.gov': {}
    // }

    this.urlsInCache = {
      'testsafebrowsing.appspot.com/s/malware.html' : { threatMatch: 'MALWARE' },
      'testsafebrowsing.appspot.com/s/phishing.html': { threatMatch: 'SOCIAL_ENGINEERING' }
    }

    this.lookupAPIReport = {
      matches: [
        {
          threatType: 'UNWANTED_SOFTWARE',
          platformType: 'ANY_PLATFORM',
          threat: {
            url: 'testsafebrowsing.appspot.com/s/unwanted.html'
          },
          cacheDuration: '300s',
          threatEntryType: 'URL'
        }
      ]
    }

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

    this.threatlessReports = []
  }
}

module.exports = threatReportData
