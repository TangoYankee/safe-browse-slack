'use strict'

const request = require('supertest')
const server = require('../main')
const Signature = require('../../apps/credential/signature')
jest.mock('../../apps/credential/signature')

const { helpWelcomeData, helpInputData } = require('../../apps/blocks/test-data/help-test-data')
const requestPromise = require('request-promise')
const { mockTokenRequest, mockFailedTokenRequest } = require('../../apps/credential/test-data/oauth-data')
const cryptoRandomString = require('crypto-random-string')

describe('should receive valid requests to safebrowse command', () => {
  var spyOnLog
  beforeEach(() => {
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

  it('should recieve no text', async () => {
    await request(server)
      .post('/safebrowse')
      .send({
        user_id: 'tangoyankee',
        text: ''
      })
      .expect('Content-Type', /json/)
      .expect(200, helpInputData)
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

  it('should request help', async () => {
    await request(server)
      .post('/safebrowse')
      .send({
        user_id: 'tangoyankee',
        text: 'help'
      })
      .expect('Content-Type', /json/)
      .expect(200, helpWelcomeData)
  })
})

describe('recieve a invalid request for safebrowse command', () => {
  beforeEach(() => {
    Signature.mockImplementationOnce(() => {
      return { isValid: false }
    })
  })
  afterEach(() => {
    server.close()
    Signature.mockClear()
  })

  it('should not be valid', async () => {
    const res = await request(server).post('/safebrowse')
    expect(res.status).toBe(400)
    expect(res.text).toBe('Ignore this request')
  })
})

describe('oauth flow', () => {
  afterEach(() => {
    server.close()
  })

  it('should have a successful oauth path', async () => {
    var code = cryptoRandomString({ length: 9 })
    requestPromise.post.mockResolvedValue(mockTokenRequest)
    return request(server)
      .get('/oauth')
      .query({ code: code })
      .expect('Location', '/?message=success')
  })

  it('should not recieve a code', async () => {
    var spyOnWarn = jest.spyOn(console, 'warn').mockImplementation()
    await request(server)
      .get('/oauth')
      .query({ code: '' })
      .expect('Location', '/?message=error')
    expect(spyOnWarn).toHaveBeenCalledWith('authorization code not received.')
    spyOnWarn.mockRestore()
  })

  it('should recieve a code but fail to get a token', async () => {
    var spyOnWarn = jest.spyOn(console, 'warn').mockImplementation()
    var code = cryptoRandomString({ length: 9 })
    requestPromise.post.mockResolvedValue(mockFailedTokenRequest)
    await request(server)
      .get('/oauth')
      .query({ code: code })
      .expect('Location', '/?message=error')
    expect(spyOnWarn).toHaveBeenCalledWith(new Error('oauth failed to recieve team ID and/or access token'))
    spyOnWarn.mockRestore()
  })
})
