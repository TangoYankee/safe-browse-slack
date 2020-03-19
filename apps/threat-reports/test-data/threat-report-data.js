'use strict'

class threatReportData {
  constructor (urls) {
    this.urls = urls

    this.urlsInCache = {
      'testsafebrowsing.appspot.com/s/malware.html': { threatMatch: 'MALWARE' },
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
  }
}

module.exports = threatReportData
