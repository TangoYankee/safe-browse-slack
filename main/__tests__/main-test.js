'use strict'

const request = require('supertest')
const server = require('../main')
const Signature = require('../../apps/credential/signature')
jest.mock('../../apps/credential/signature')

const requestPromise = require('request-promise')
const { mockTokenRequest, mockFailedTokenRequest } = require('../../apps/credential/test-data/oauth-data')
const cryptoRandomString = require('crypto-random-string')

describe('recieve a request for safebrowse command', () => {
  afterEach(() => {
    server.close()
    Signature.mockClear()
  })

  it('should be valid but recieve no text', async () => {
    var spyOnLog = jest.spyOn(console, 'log').mockImplementation()
    Signature.mockImplementationOnce(() => {
      return { isValid: true }
    })
    const res = await request(server).post('/safebrowse').send({ text: '' })
    expect(res.status).toBe(200)
    expect(spyOnLog).toHaveBeenCalledWith([])
    spyOnLog.mockRestore()
  })

  it('should not be valid', async () => {
    Signature.mockImplementationOnce(() => {
      return { isValid: false }
    })
    const res = await request(server).post('/safebrowse')
    expect(res.status).toBe(400)
    expect(res.text).toBe('Ignore this request')
  })

  it('should be valid and send urls to parse', async () => {
    var spyOnLog = jest.spyOn(console, 'log').mockImplementation()
    Signature.mockImplementationOnce(() => {
      return { isValid: true }
    })
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
    spyOnLog.mockRestore()
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
