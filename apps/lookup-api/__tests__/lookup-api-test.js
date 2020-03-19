'use strict'

const requestPromise = require('request-promise')
const LookupAPI = require('../lookup-api')
const { mockUrlDomainKeys, mockThreatEntries, mockRequestBody } = require('../test-data/request-body-data')
const { mockFailedLookupResponse, mockLookupResponse } = require('../test-data/response-data')

describe('urldomainkeys include three threats and one harmless', () => {
  var lookupAPI
  var threats = [
    'SOCIAL_ENGINEERING',
    'UNWANTED_SOFTWARE',
    'MALWARE',
    'NONE_FOUND'
  ]
  var urlDomainKeys = mockUrlDomainKeys(threats)

  beforeAll(() => {
    requestPromise.post.mockResolvedValue(mockLookupResponse(threats))
    lookupAPI = new LookupAPI()
  })

  afterAll(() => {
    lookupAPI = undefined
  })

  it('should create threatEntries that are the same as one with duplicates', () => {
    lookupAPI.urlDomainKeys = urlDomainKeys
    expect(lookupAPI._threatEntries).toEqual(mockThreatEntries(urlDomainKeys.concat(urlDomainKeys)))
  })

  it('should create a json formatted body for http request', () => {
    lookupAPI.urlDomainKeys = urlDomainKeys
    expect(lookupAPI._requestBody).toEqual(mockRequestBody(mockThreatEntries(urlDomainKeys)))
  })

  it('should call lookup api', async () => {
    expect.assertions(1)
    await lookupAPI.report(urlDomainKeys)
    expect(requestPromise.post).toHaveBeenCalledTimes(1)
  })

  it('should recieve three matching threats', async () => {
    var body = await lookupAPI.report(urlDomainKeys)
    return expect(body.matches.length).toEqual(3)
  })
})

describe('urldomiankeys only has a harmless url', () => {
  var lookupAPI
  var threats = ['NONE_FOUND']
  var urlDomainKeys = mockUrlDomainKeys(threats)

  beforeAll(() => {
    requestPromise.post.mockResolvedValue(mockLookupResponse(threats))
    lookupAPI = new LookupAPI()
  })

  afterAll(() => {
    lookupAPI = undefined
  })

  it('should recieve a response void of matches to threats', async () => {
    var body = await lookupAPI.report(urlDomainKeys)
    return expect(body.matches).toEqual(undefined)
  })

  it('should call lookup api', async () => {
    await lookupAPI.report(urlDomainKeys)
    return expect(requestPromise.post).toHaveBeenCalledTimes(1)
  })
})

describe('urldomiankeys is empty', () => {
  var lookupAPI
  var threats = []
  var urlDomainKeys = mockUrlDomainKeys(threats)

  beforeAll(() => {
    requestPromise.post.mockResolvedValue(mockLookupResponse(threats))
    lookupAPI = new LookupAPI()
  })

  afterAll(() => {
    lookupAPI = undefined
  })

  it('should abort calling lookup api', async () => {
    await lookupAPI.report(urlDomainKeys)
    return expect(requestPromise.post).toHaveNotBeenCalled
  })

  it('should have a similar response to recieving no threat matches', async () => {
    var body = await lookupAPI.report(urlDomainKeys)
    return expect(body.matches).toEqual(undefined)
  })
})

describe('lookup denies access', () => {
  var lookupAPI
  var threats = ['MALWARE']
  var urlDomainKeys = mockUrlDomainKeys(threats)
  var spyOnWarn
  beforeAll(() => {
    spyOnWarn = jest.spyOn(console, 'warn').mockImplementation()
    requestPromise.post.mockResolvedValue(mockFailedLookupResponse)
    lookupAPI = new LookupAPI()
  })

  afterAll(() => {
    lookupAPI = undefined
    spyOnWarn.mockRestore()
  })

  it('should recieve an error containing a 401 code', async () => {
    return expect(lookupAPI.report(urlDomainKeys)).resolves.toThrow('safe browse response code: 401')
  })

  it('should receive a warning with 401 code error', async () => {
    await lookupAPI.report(urlDomainKeys)
    return expect(console.warn).toHaveBeenCalledWith(new Error('safe browse response code: 401'))
  })
})
