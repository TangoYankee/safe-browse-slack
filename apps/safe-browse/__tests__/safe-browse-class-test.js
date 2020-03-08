'use strict'

const { SafeBrowse } = require('../safe-browse-class')
const { urlDomainKeyMap, mockThreatEntries, mockRequestBody } = require('../class-test-data/request-body-data')

describe('safebrowse class exists with three threats and one harmless', () => {
  var safeBrowse
  var urlDomainKeys = [
    urlDomainKeyMap.SOCIAL_ENGINEERING,
    urlDomainKeyMap.UNWANTED_SOFTWARE,
    urlDomainKeyMap.MALWARE,
    urlDomainKeyMap.NONE_FOUND
  ]
  beforeAll(() => {
    safeBrowse = new SafeBrowse(urlDomainKeys)
  })

  it('should create threatEntries that are the same as one with duplicates', () => {
    expect(safeBrowse._threatEntries).toEqual(mockThreatEntries([
      urlDomainKeyMap.SOCIAL_ENGINEERING,
      urlDomainKeyMap.SOCIAL_ENGINEERING,
      urlDomainKeyMap.UNWANTED_SOFTWARE,
      urlDomainKeyMap.UNWANTED_SOFTWARE,
      urlDomainKeyMap.MALWARE,
      urlDomainKeyMap.MALWARE,
      urlDomainKeyMap.NONE_FOUND,
      urlDomainKeyMap.NONE_FOUND
    ]))
  })

  it('should create a json formatted body for http request', () => {
    expect(safeBrowse._requestBody).toEqual(mockRequestBody(mockThreatEntries(urlDomainKeys)))
  })

  it.skip('should call safebrowse', () => {
    test.todo('spy on request promise is call')
  })

  it.skip('should call google safe browse', () => {
    test.todo('only call if the list of url domain keys is at least one')
  })
})
