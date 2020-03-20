'use strict'

const threatMap = {

  SOCIAL_ENGINEERING: {
    url: 'testsafebrowsing.appspot.com/s/phishing.html',
    threatType: 'SOCIAL_ENGINEERING'
  },

  UNWANTED_SOFTWARE: {
    url: 'testsafebrowsing.appspot.com/s/unwanted.html',
    threatType: 'UNWANTED_SOFTWARE'
  },

  MALWARE: {
    url: 'testsafebrowsing.appspot.com/s/malware.html',
    threatType: 'MALWARE'
  },

  POTENTIALLY_HARMFUL_APPLICATION: {
    url: 'dmv.ca.gov',
    threatType: 'POTENTIALLY_HARMFUL_APPLICATION'
  },

  SAFE_BROWSE_ERROR: {
    url: 'https://www.google.com/maps/place/Emerils+New+Orleans/@29.944616,-90.0694747,17z/data=!3m1!4b1!4m5!3m4!1s0x8620a6718f86a9a7:0x6ab2069a8e2a2d7d!8m2!3d29.944616!4d-90.067286',
    threatType: 'SAFE_BROWSE_ERROR'
  },

  NONE_FOUND: {
    url: 'nasa.gov',
    threatType: ''
  }
}

module.exports = {
  threatMap
}
