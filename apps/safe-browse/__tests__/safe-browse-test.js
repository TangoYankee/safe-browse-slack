'use strict'

const requestPromise = require('request-promise')
const { SafeBrowse } = require('../safe-browse')
const { mockUrlDomainKeys, mockThreatEntries, mockRequestBody } = require('../class-test-data/request-body-data')
const { mockFailedSafeBrowseResponse, mockSafeBrowseResponse } = require('../class-test-data/response-data')

describe('urldomainkeys include three threats and one harmless', () => {
  var safeBrowse
  var threats = [
    'SOCIAL_ENGINEERING',
    'UNWANTED_SOFTWARE',
    'MALWARE',
    'NONE_FOUND'
  ]
  var urlDomainKeys = mockUrlDomainKeys(threats)

  beforeAll(() => {
    requestPromise.post.mockResolvedValue(mockSafeBrowseResponse(threats))
    safeBrowse = new SafeBrowse(urlDomainKeys)
  })

  afterAll(() => {
    safeBrowse = undefined
  })

  it('should create threatEntries that are the same as one with duplicates', () => {
    expect(safeBrowse._threatEntries).toEqual(mockThreatEntries(urlDomainKeys.concat(urlDomainKeys)))
  })

  it('should create a json formatted body for http request', () => {
    expect(safeBrowse._requestBody).toEqual(mockRequestBody(mockThreatEntries(urlDomainKeys)))
  })

  it('should call safebrowse', async () => {
    expect.assertions(1)
    await safeBrowse.threatMatches
    expect(requestPromise.post).toHaveBeenCalledTimes(1)
  })

  it('should recieve three matching threats', async () => {
    var body = await safeBrowse.threatMatches
    return expect(body.matches.length).toEqual(3)
  })
})

describe('urldomiankeys only has a harmless url', () => {
  var safeBrowse
  var threats = ['NONE_FOUND']
  var urlDomainKeys = mockUrlDomainKeys(threats)

  beforeAll(() => {
    requestPromise.post.mockResolvedValue(mockSafeBrowseResponse(threats))
    safeBrowse = new SafeBrowse(urlDomainKeys)
  })

  afterAll(() => {
    safeBrowse = undefined
  })

  it('should recieve a response void of matches to threats', async () => {
    var body = await safeBrowse.threatMatches
    return expect(body.matches).toEqual(undefined)
  })

  it('should call safebrowse', async () => {
    await safeBrowse.threatMatches
    return expect(requestPromise.post).toHaveBeenCalledTimes(1)
  })
})

describe('urldomiankeys is empty', () => {
  var safeBrowse
  var threats = []
  var urlDomainKeys = mockUrlDomainKeys(threats)

  beforeAll(() => {
    requestPromise.post.mockResolvedValue(mockSafeBrowseResponse(threats))
    safeBrowse = new SafeBrowse(urlDomainKeys)
  })

  afterAll(() => {
    safeBrowse = undefined
  })

  it('should abort calling safebrowse', async () => {
    await safeBrowse.threatMatches
    return expect(requestPromise.post).toHaveNotBeenCalled
  })

  it('should have a similar response to recieving no threat matches', async () => {
    var body = await safeBrowse.threatMatches
    return expect(body.matches).toEqual(undefined)
  })
})

describe('safebrowse denies access', () => {
  var safeBrowse
  var threats = ['MALWARE']
  var urlDomainKeys = mockUrlDomainKeys(threats)
  var spyOnWarn
  beforeAll(() => {
    spyOnWarn = jest.spyOn(console, 'warn').mockImplementation()
    requestPromise.post.mockResolvedValue(mockFailedSafeBrowseResponse)
    safeBrowse = new SafeBrowse(urlDomainKeys)
  })

  afterAll(() => {
    safeBrowse = undefined
    spyOnWarn.mockRestore()
  })

  it('should recieve an error containing a 401 code', async () => {
    return expect(safeBrowse.threatMatches).resolves.toThrow('safe browse response code: 401')
  })

  it('should receive a warning with 401 code error', async () => {
    await safeBrowse.threatMatches
    return expect(console.warn).toHaveBeenCalledWith(new Error('safe browse response code: 401'))
  })
})
