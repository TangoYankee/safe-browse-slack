'use strict'

const request = require('supertest')
const server = require('../main')
const requestPromise = require('request-promise')
const { mockLookupResponse } = require('../../apps/lookup-api/test-data/response-data')

const Signature = require('../../apps/credential/signature')
jest.mock('../../apps/credential/signature')


describe('threat urls are provided', () => {
  var spyOnLog
  var threats = [
    'SOCIAL_ENGINEERING',
    'UNWANTED_SOFTWARE',
    'MALWARE',
    'NONE_FOUND'
  ]
  beforeEach(() => {
    requestPromise.post.mockResolvedValue(mockLookupResponse(threats))
    spyOnLog = jest.spyOn(console, 'log').mockImplementation()
    Signature.mockImplementationOnce(() => {
      return { isValid: true }
    })
  })

  afterEach(() => {
    server.close()
    Signature.mockClear()
    spyOnLog.mockRestore()
  })

  it('should send urls to parse', async () => {
    var res = await request(server)
      .post('/safebrowse')
      .send({
        token: 'dev',
        team_id: 'dev',
        team_domain: 'dev',
        channel_id: 'dev',
        channel_name: 'privategroup',
        user_id: 'dev',
        user_name: 'dev',
        command: '/safebrowse',
        text: '<http://dmv.ca.gov/> <https://www.google.com/maps/place/Emeril\'s+New+Orleans/@29.944616,-90.0694747,17z/data=!3m1!4b1!4m5!3m4!1s0x8620a6718f86a9a7:0x6ab2069a8e2a2d7d!8m2!3d29.944616!4d-90.067286>  <http://www.nasa.gov|www.nasa.gov> <http://www.dmv.ca.gov|www.dmv.ca.gov> <@UH00Z00Z0|dev.user>',
        response_url: 'https://hooks.slack.com/commands/',
        trigger_id: '0'
      })
    expect(res.status).toBe(200)
    expect(spyOnLog).toHaveBeenCalledWith([
      'dmv.ca.gov',
      'google.com/maps/place/Emeril\'s+New+Orleans/@29.944616,-90.0694747,17z/data=!3m1!4b1!4m5!3m4!1s0x8620a6718f86a9a7:0x6ab2069a8e2a2d7d!8m2!3d29.944616!4d-90.067286',
      'nasa.gov'
    ])
  })
})
