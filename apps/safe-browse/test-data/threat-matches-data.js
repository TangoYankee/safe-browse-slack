'use strict'

const threatMatchOne = {
  matches: [
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
      threatType: 'UNWANTED_SOFTWARE',
      platformType: 'ANY_PLATFORM',
      threat: {
        url: 'testsafebrowsing.appspot.com/s/unwanted.html'
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
}

const threatMatchTwo = {
  matches: [
    {
      threatType: 'UNWANTED_SOFTWARE',
      platformType: 'ANY_PLATFORM',
      threat: {
        url: 'testsafebrowsing.appspot.com/s/unwanted.html'
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
}

const threatMatchThree = {
}

const threatMatchFour = {
  matches: [
    {
      threatType: 'UNWANTED_SOFTWARE',
      platformType: 'ANY_PLATFORM',
      threat: {
        url: 'testsafebrowsing.appspot.com/s/unwanted.html'
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
}

const threatMatchFive = 'error'

const threatMatchSix = 'error'

module.exports = {
  threatMatchOne,
  threatMatchTwo,
  threatMatchThree,
  threatMatchFour,
  threatMatchFive,
  threatMatchSix
}
