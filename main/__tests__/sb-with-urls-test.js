'use strict'

const request = require('supertest')
const server = require('../main')
const requestPromise = require('request-promise')
const { mockLookupResponse, mockFailedLookupResponse } = require('../test-data/sb-with-urls-data')

const Signature = require('../../apps/credential/signature')
const ThreatCache = require('../../apps/threat-cache/threat-cache')
jest.mock('../../apps/credential/signature')


describe('successful call to lookup api', () => {
  var spyOnLog
  var spyOnRequest
  var lookupThreats = [
    'SOCIAL_ENGINEERING',
    'UNWANTED_SOFTWARE',
    'MALWARE',
    'NONE_FOUND'
  ]
  var cachThreats = [
    'POTENTIALLY_HARMFUL_APPLICATION'
  ]

  beforeAll(() => {
    requestPromise.post.mockResolvedValue(mockLookupResponse(lookupThreats))
    spyOnRequest = jest.spyOn(requestPromise, 'post')
    spyOnLog = jest.spyOn(console, 'log').mockImplementation()
    Signature.mockImplementationOnce(() => {
      return { isValid: true }
    })
  })

  afterAll(() => {
    server.close()
    Signature.mockClear()
    spyOnLog.mockRestore()
  })

  it('should send urls to parse', async () => {
    var res = await request(server)
      .post('/safebrowse')
      .send({
        text: '<http://dmv.ca.gov/> <https://www.google.com/maps/place/Emeril\'s+New+Orleans/@29.944616,-90.0694747,17z/data=!3m1!4b1!4m5!3m4!1s0x8620a6718f86a9a7:0x6ab2069a8e2a2d7d!8m2!3d29.944616!4d-90.067286>  <http://www.nasa.gov|www.nasa.gov> <http://www.dmv.ca.gov|www.dmv.ca.gov> <@UH00Z00Z0|dev.user>',
        response_url: 'https://hooks.slack.com/commands/'
      })
    expect(res.status).toBe(200)
    expect(spyOnLog).toHaveBeenCalledWith([
      'dmv.ca.gov',
      'google.com/maps/place/Emeril\'s+New+Orleans/@29.944616,-90.0694747,17z/data=!3m1!4b1!4m5!3m4!1s0x8620a6718f86a9a7:0x6ab2069a8e2a2d7d!8m2!3d29.944616!4d-90.067286',
      'nasa.gov'
    ])
    expect(spyOnRequest)
      .toHaveBeenCalledWith({
        "body": {
          "blocks": [{
            "text": {
              "text": expect.any(String),
              "type": "mrkdwn"
            },
            "type": "section"
          }, {
            "type": "divider"
          }, {
            "elements": [{
              "text": "For more info, explore <https://developers.google.com/safe-browsing/v4/advisory|Google Safe Browse>", "type": "mrkdwn"
            }],
            "type": "context"
          }],
          "response_type": "ephemeral"
        },
        "json": true,
        "url": "https://hooks.slack.com/commands/"
      })
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
