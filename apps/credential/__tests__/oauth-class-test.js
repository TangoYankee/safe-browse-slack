'use strict'

const { OAuth } = require('../oauth-class')
const { TestCrypto } = require('../test-data/token-crypto-data')
const { mockResponse, mockCodeRequest, mockTokenRequest } = require('../test-data/oauth-data')
const request = require('request')
const cryptoRandomString = require('crypto-random-string')

describe('oauth should inherit ability to cipher tokens', () => {
  var res
  var oauth
  var codeReq
  var code
  var testCrypto
  beforeAll(() => {
    res = mockResponse()
    code = cryptoRandomString({ length: 9 })
    codeReq = mockCodeRequest(code)
    oauth = new OAuth(codeReq, res)
    testCrypto = new TestCrypto()
    oauth.tokenKey = testCrypto.tokenKey
  })

  it('should have token encrypt function', () => {
    testCrypto.tokenCipher = oauth.encrypt(testCrypto.tokenPlain)
    expect(testCrypto.isValidCipher).toBe(true)
  })

  it('should successfully decrypt tokens', () => {
    testCrypto.tokenCipher = oauth.encrypt(testCrypto.tokenPlain)
    expect(oauth.decrypt(testCrypto.tokenCipher)).toEqual(testCrypto.tokenPlain)
  })
})

describe('oauth fails to recieve an authorization code', () => {
  var res = mockResponse()
  var code = ''
  var codeReq = mockCodeRequest(code)
  var oauth
  var spyOnMockRequest
  var spyOnRes
  beforeEach(() => {
    spyOnMockRequest = spyOn(request, 'post')
    oauth = new OAuth(codeReq, res)
    spyOnRes = spyOn(oauth, 'res')
  })

  it('should be missing authorization code', () => {
    expect(!oauth.authCode).toBe(true)
  })

  it('should respond with a 500 code', () => {
    expect(spyOnRes.status).toHaveBeenCalledWith(500)
  })

  it('should redirect home with an error message', () => {
    expect(spyOnRes.redirect).toHaveBeenCalledWith('/?message=error')
  })

  it('should not call a request for a token from slack', () => {
    expect(spyOnMockRequest).toHaveNotBeenCalled
  })
})

describe('oauth successfully recieves an authorization code and token', () => {
  var res = mockResponse()
  var code = cryptoRandomString({ length: 9 })
  var codeReq = mockCodeRequest(code)
  var oauth
  
  beforeEach(() => {
    request.post.mockResolvedValue(mockTokenRequest())
    oauth = new OAuth(codeReq, res)
  })

  it('should not be missing an auth code', () => {
    expect(!oauth.authCode).toBe(false)
  })

  it('should redirect with a string', () => {
    expect.assertions(1)
    return expect(oauth._tokenBody).resolves.toEqual({data:'failure'})
  })

  it('should have a token body', () => {
    return expect(oauth.setTokenBody()).resolves.toEqual({data: 'failure'})
  })
  
  // it('should have a valid team id', () => {
  //   // oauth._tokenBody
  //   console.log(`from test: ${oauth.tokenBody.team.id}`)
  //   expect(oauth.teamID).toEqual('heroes')
  // })

  // it('should have a valid token', () => {
  //   expect(oauth.tokenCipher).toEqual('cipher')
  // })
})
