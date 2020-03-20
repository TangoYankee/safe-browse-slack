'use strict'

const request = require('supertest')
const server = require('../main')
const requestPromise = require('request-promise')
const { mockIncomingText, mockThreatCacheReport, mockLookupResponse, mockFailedLookupResponse, mockThreatReport } = require('../test-data/sb-with-urls-data')

const Signature = require('../../apps/credential/signature')
jest.mock('../../apps/credential/signature')
const ThreatCache = require('../../apps/threat-cache/threat-cache')
jest.mock('../../apps/threat-cache/threat-cache')


describe('successful call to lookup api', () => {
  var spyOnRequest
  var mockText
  var lookupThreats = [
    'SOCIAL_ENGINEERING',
    'UNWANTED_SOFTWARE',
    'MALWARE',
    'NONE_FOUND'
  ]
  var cacheThreats = [
    'POTENTIALLY_HARMFUL_APPLICATION'
  ]

  beforeAll(() => {
    mockText = mockIncomingText(lookupThreats.concat(cacheThreats))
    console.log(mockText)
    requestPromise.post.mockResolvedValue(mockLookupResponse(lookupThreats))
    spyOnRequest = jest.spyOn(requestPromise, 'post')
    Signature.mockImplementationOnce(() => {
      return { isValid: true }
    })
    ThreatCache.mockImplementationOnce(() => {
      return {
        report : ()=> {mockThreatCacheReport(cacheThreats)}
      }
    })
  })

  afterAll(() => {
    server.close()
    Signature.mockClear()
    ThreatCache.mockClear()
    spyOnRequest.mockRestore()
  })

  it('should send urls to parse', async () => {
    var res = await request(server)
      .post('/safebrowse')
      .send({
        text: `${mockText} <@UH00Z00Z0|dev.user>`,
        response_url: 'https://hooks.slack.com/commands/'
      })
    expect(res.status).toBe(200)
    expect(spyOnRequest).toHaveBeenCalledTimes(2)
    expect(spyOnRequest).toHaveBeenCalledWith(mockThreatReport)
  })
})

describe('failed call to lookup api', () => {
  var lookupThreats = [
    'SOCIAL_ENGINEERING',
    'UNWANTED_SOFTWARE',
    'MALWARE',
    'NONE_FOUND'
  ]
  var cachThreats = [
    'POTENTIALLY_HARMFUL_APPLICATION'
  ]

  beforeEach(() => {
    requestPromise.post.mockResolvedValue(mockFailedLookupResponse)
    Signature.mockImplementationOnce(() => {
      return { isValid: true }
    })
  })

  afterEach(() => {
    server.close()
    Signature.mockClear()
  })

  it.skip('should return safe browse error as threat match', async () => {

  })
})
