'use strict'

const threatEntryOne = [
  { url: 'testsafebrowsing.appspot.com/s/phishing.html' },
  { url: 'testsafebrowsing.appspot.com/s/unwanted.html' },
  { url: 'testsafebrowsing.appspot.com/s/malware.html' },
  { url: 'nasa.gov' }
]

const threatEntryExistOne = true

const threatEntryTwo = [
  { url: 'testsafebrowsing.appspot.com/s/unwanted.html' },
  { url: 'testsafebrowsing.appspot.com/s/malware.html' },
  { url: 'nasa.gov' }
]

const threatEntryExistTwo = true

const threatEntryThree = [
  { url: 'nasa.gov' }
]

const threatEntryExistThree = true

const threatEntryFour = [
  { url: 'testsafebrowsing.appspot.com/s/unwanted.html' },
  { url: 'testsafebrowsing.appspot.com/s/malware.html' },
  { url: 'nasa.gov' }
]

const threatEntryExistFour = true

const threatEntryFive = []

const threatEntryExistFive = false

module.exports = {
  threatEntryOne,
  threatEntryExistOne,
  threatEntryTwo,
  threatEntryExistTwo,
  threatEntryThree,
  threatEntryExistThree,
  threatEntryFour,
  threatEntryExistFour,
  threatEntryFive,
  threatEntryExistFive
}
