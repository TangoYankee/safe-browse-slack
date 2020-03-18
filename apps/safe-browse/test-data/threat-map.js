'use strict'

const threatMap = {
  SOCIAL_ENGINEERING:
  {
    url: 'testsafebrowsing.appspot.com/s/phishing.html',
    threatType: 'SOCIAL_ENGINEERING'
  },
  UNWANTED_SOFTWARE:
  {
    url: 'testsafebrowsing.appspot.com/s/unwanted.html',
    threatType: 'UNWANTED_SOFTWARE'
  },
  MALWARE:
  {
    url: 'testsafebrowsing.appspot.com/s/malware.html',
    threatType: 'MALWARE'
  },
  NONE_FOUND:
  {
    url: 'nasa.gov', threatType: ''
  }
}

module.exports = {
  threatMap
}
