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

  it('should be valid', async () => {
    Signature.mockImplementation(() => {
      return { isValid: true }
    })
    const res = await request(server).post('/safebrowse')
    expect(res.status).toBe(200)
  })

  it('should not be valid', async () => {
    Signature.mockImplementation(() => {
      return { isValid: false }
    })
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
    expect(console.warn).toHaveBeenCalledWith('authorization code not received.')
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
