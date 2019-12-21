const links = [
  {
    urlDomainKey: 'testsafebrowsing.appspot.com/s/phishing.html',
    cacheDuration: '',
    inCache: false,
    markdownLink: '[Phishing Site](testsafebrowsing.appspot.com/s/phishing.html)',
    messageLink: '<https://testsafebrowsing.appspot.com/s/phishing.html|Phishing Site>',
    sharedAsHttpSecure: false,
    threatMatch: 'SOCIAL_ENGINEERING'
  },
  {
    urlDomainKey: 'testsafebrowsing.appspot.com/s/unwanted.html',
    cacheDuration: '',
    inCache: false,
    markdownLink: '[Unwanted Software](testsafebrowsing.appspot.com/s/unwanted.html)',
    messageLink: '<https://testsafebrowsing.appspot.com/s/unwanted.html|Unwanted Software>',
    sharedAsHttpSecure: false,
    threatMatch: ''
  },
  {
    urlDomainKey: 'testsafebrowsing.appspot.com/s/malware.html',
    cacheDuration: '',
    inCache: false,
    markdownLink: '[Malware Site](testsafebrowsing.appspot.com/s/malware.html)',
    messageLink: '<https://testsafebrowsing.appspot.com/s/malware.html|Malware Site>',
    sharedAsHttpSecure: false,
    threatMatch: ''
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

module.exports = {
  links
}
