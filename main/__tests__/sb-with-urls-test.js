'use strict'

const request = require('supertest')
// const server = require('../main')
const requestPromise = require('request-promise')
const {
  mockIncomingUrls,
  mockLookupResponse,
  mockFailedLookupResponse,
  mockThreatReport
} = require('../test-data/sb-with-urls-data')

const Signature = require('../../apps/credential/signature')
jest.mock('../../apps/credential/signature')

describe('successful call to lookup api', () => {
  var server
  var spyOnRequest
  var mockUrls
  var lookupThreats = [
    'SOCIAL_ENGINEERING',
    'UNWANTED_SOFTWARE',
    'MALWARE',
    'POTENTIALLY_HARMFUL_APPLICATION',
    'NONE_FOUND'
  ]
  var reportTextSuccess = 'testsafebrowsing.appspot.com/s/phishing.html -reported <https://developers.google.com/safe-browsing/v4/advisory|no suspected harmful content> :small_blue_diamond:,\ntestsafebrowsing.appspot.com/s/unwanted.html -reported <https://www.google.com/about/unwanted-software-policy.html|unwanted software> :no_entry_sign:,\ntestsafebrowsing.appspot.com/s/malware.html -reported <https://www.stopbadware.org/|malware> :beetle:,\ndmv.ca.gov -reported <https://developers.google.com/safe-browsing/v4/advisory|potentially harmful app> :exclamation:,\n'
  beforeEach(() => {
    delete require.cache[require.resolve('../main')]
    server = require('../main')
    mockUrls = mockIncomingUrls(lookupThreats)
    requestPromise.post.mockResolvedValue(mockLookupResponse(lookupThreats))
    spyOnRequest = jest.spyOn(requestPromise, 'post')
    Signature.mockImplementationOnce(() => {
      return { isValid: true }
    })
  })

  afterEach((done) => {
    server.close()
    Signature.mockClear()
    spyOnRequest.mockRestore()
    done()
  })

  it('should send urls to parse', async () => {
    var res = await request(server)
      .post('/safebrowse')
      .send({
        text: `${mockUrls} <@UH00Z00Z0|dev.user>`,
        response_url: 'https://hooks.slack.com/commands/'
      })
    expect(res.status).toBe(200)
    expect(spyOnRequest).toHaveBeenCalledTimes(2)
    expect(spyOnRequest).toHaveBeenCalledWith(mockThreatReport(reportTextSuccess))
  })
})

describe('failed call to lookup api', () => {
  var server
  var mockUrls
  var spyOnWarn
  var spyOnRequest
  var lookupThreats = [
    'SAFE_BROWSE_ERROR'
  ]
  var reportTextError = 'google.com/maps/place/Emerils+New+Orleans/@29.944616,-90.0694747,17z/data=!3m1!4b1!4m5!3m4!1s0x8620a6718f86a9a7:0x6ab2069a8e2a2d7d!8m2!3d29.944616!4d-90.067286 -reported <https://developers.google.com/safe-browsing/v4/advisory|error when checking this url> :heavy_multiplication_x:,\n'
  beforeEach(() => {
    delete require.cache[require.resolve('../main')]
    server = require('../main')
    mockUrls = mockIncomingUrls(lookupThreats)
    spyOnWarn = jest.spyOn(console, 'warn').mockImplementation()
    requestPromise.post.mockResolvedValue(mockFailedLookupResponse)
    spyOnRequest = jest.spyOn(requestPromise, 'post')
    Signature.mockImplementationOnce(() => {
      return { isValid: true }
    })
  })

  afterEach((done) => {
    server.close()
    Signature.mockClear()
    spyOnRequest.mockRestore()
    spyOnWarn.mockRestore()
    done()
  })

  it('have an error as the resulting match', async () => {
    var res = await request(server)
      .post('/safebrowse')
      .send({
        text: `${mockUrls} <@UH00Z00Z0|dev.user>`,
        response_url: 'https://hooks.slack.com/commands/'
      })
    expect(res.status).toBe(200)
    expect(spyOnRequest).toHaveBeenCalledTimes(2)
    expect(spyOnRequest).toHaveBeenCalledWith(mockThreatReport(reportTextError))
    expect(spyOnWarn).toHaveBeenCalledWith(new Error('safe browse response code: 401'))
  })
})
