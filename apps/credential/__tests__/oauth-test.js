'use strict'

const OAuth = require('../oauth')
const {
  mockResponse, mockCodeRequest,
  mockTokenRequest, mockFailedTokenRequest
} = require('../test-data/oauth-data')
const requestPromise = require('request-promise')
const cryptoRandomString = require('crypto-random-string')

describe('oauth fails to recieve an authorization code', () => {
  var res = mockResponse()
  var code = ''
  var codeReq = mockCodeRequest(code)
  var oauth
  var spyOnWarn

  beforeEach(() => {
    spyOnWarn = jest.spyOn(console, 'warn').mockImplementation()
    oauth = new OAuth(codeReq, res)
  })

  afterAll(() => {
    spyOnWarn.mockRestore()
  })

  it('should be missing authorization code', () => {
    expect(!oauth.authCode).toBe(true)
  })

  it('should respond with a 500 code', () => {
    expect(res.status).toHaveBeenCalledWith(500)
  })

  it('should redirect home with an error message', () => {
    expect(res.redirect).toHaveBeenCalledWith('/?message=error')
  })

  it('should have called console warn', () => {
    expect(console.warn).toHaveBeenCalledWith('authorization code not received.')
  })
})

describe('oauth successfully recieves an authorization code and token', () => {
  var res = mockResponse()
  var code = cryptoRandomString({ length: 9 })
  var codeReq = mockCodeRequest(code)
  var oauth

  beforeAll(() => {
    requestPromise.post.mockResolvedValue(mockTokenRequest)
    oauth = new OAuth(codeReq, res)
  })

  it('should not be missing an auth code', () => {
    expect(!oauth.authCode).toBe(false)
  })

  it('should redirect to a successful message', async () => {
    expect.assertions(1)
    await oauth.setTokenInfo()
    return expect(res.redirect).toHaveBeenCalledWith('/?message=success')
  })

  it('should fetch the authorization token response body', () => {
    expect.assertions(1)
    return expect(oauth._tokenBody).resolves.toEqual(
      expect.objectContaining({
        access_token: expect.any(String),
        team_id: 'ZZZZ0Z0ZZ'
      }))
  })

  it('should set token info based on the token body function', () => {
    expect.assertions(1)
    return expect(oauth.setTokenInfo()).resolves.toEqual(
      expect.objectContaining({
        access_token: expect.any(String),
        team_id: 'ZZZZ0Z0ZZ'
      }))
  })

  it('should have a valid team id', async () => {
    expect.assertions(1)
    const tokenBody = await oauth.setTokenInfo()
    return expect(tokenBody.team_id).toEqual('ZZZZ0Z0ZZ')
  })
})

describe('slack denies the request for a token', () => {
  var res = mockResponse()
  var code = ''
  var codeReq = mockCodeRequest(code)
  var oauth
  var spyOnWarn

  beforeAll(() => {
    requestPromise.post.mockResolvedValue(mockFailedTokenRequest)
    spyOnWarn = jest.spyOn(console, 'warn').mockImplementation()
    oauth = new OAuth(codeReq, res)
  })

  afterAll(() => {
    spyOnWarn.mockRestore()
  })

  it('should redirect to an error message', async () => {
    return expect(oauth._tokenBody).resolves.toThrow('oauth failed to recieve team ID and/or access token')
  })

  it('should warn that needed data not gathered', async () => {
    expect.assertions(1)
    await oauth._tokenBody
    return expect(spyOnWarn).toHaveBeenCalledWith(new Error('oauth failed to recieve team ID and/or access token'))
  })

  it('should redirect with an error message', async () => {
    expect.assertions(1)
    await oauth._tokenBody
    return expect(res.redirect).toHaveBeenCalledWith('/?message=error')
  })

  it('should send a response with a 400 code', async () => {
    expect.assertions(1)
    await oauth._tokenBody
    expect(res.status).toHaveBeenCalledWith(400)
  })
})
