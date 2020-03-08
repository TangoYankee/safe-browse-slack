'use strict'


const { threatMap } = require('../class-test-data/threat-map')

const messageData = {
  links: [
    {
      urlDomainKey: threatMap.SOCIAL_ENGINEERING.url,
      cacheDuration: '',
      inCache: true
    },
    {
      urlDomainKey: threatMap.SOCIAL_ENGINEERING.url,
      cacheDuration: '',
      inCache: true
    },
    {
      urlDomainKey: threatMap.UNWANTED_SOFTWARE.url,
      cacheDuration: '',
      inCache: false
    },
    {
      urlDomainKey: threatMap.UNWANTED_SOFTWARE.url,
      cacheDuration: '',
      inCache: false
    },
    {
      urlDomainKey: threatMap.MALWARE.url,
      cacheDuration: '',
      inCache: false
    },
    {
      urlDomainKey: threatMap.NONE_FOUND.url,
      cacheDuration: '',
      inCache: false
    }
  ]
}

module.exports = { messageData }
