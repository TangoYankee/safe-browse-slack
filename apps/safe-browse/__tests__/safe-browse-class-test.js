'use strict'

const { SafeBrowse } = require('../safe-browse-class')
const { mockRequestBody, threatEntriesMap } = require('../class-test-data/request-body-data')


describe('safebrowse class exists with three threats and one harmless', () => {
  var safeBrowse
  var threatEntries = [
    { url: threatEntriesMap['SOCIAL_ENGINEERING'] },
    { url: threatEntriesMap['UNWANTED_SOFTWARE']},
    { url: threatEntriesMap['MALWARE']},
    { url: threatEntriesMap['NONE_FOUND']}
  ]
  beforeAll(() => {
    safeBrowse = new SafeBrowse(threatEntries)
  })

  it('should create a json formatted body for http request', () => {
    expect(safeBrowse._requestBody).toEqual(mockRequestBody(threatEntries))
  })
})
