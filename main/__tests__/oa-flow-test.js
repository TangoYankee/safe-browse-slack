'use strict'

const request = require('supertest')
const server = require('../main')
const requestPromise = require('request-promise')
const { mockTokenRequest, mockFailedTokenRequest } = require('../../apps/credential/test-data/oauth-data')
const cryptoRandomString = require('crypto-random-string')

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
