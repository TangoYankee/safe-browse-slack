'use strict'

const { OAuth } = require('../oauth-class')
const { TestCrypto } = require('../test-data/token-crypto-data')
const { mockResponse, mockCodeRequest, mockTokenRequest } = require('../test-data/oauth-data')
const cryptoRandomString = require('crypto-random-string')


// Create a mock OAuth response from slack

describe('oauth fails to recieve an authorization code', () => {
  var res
  var oauth
  var codeReq
  var code
  beforeAll(() => {
    res = mockResponse()
    codeReq = mockCodeRequest(code)
  })

  it('should be missing authorization code', () => {
    oauth = new OAuth(codeReq, res)
    expect(!oauth.authCode).toBe(true)
  })

  it('should respond with a 500 code', () => {
    oauth = new OAuth(codeReq, res)
    expect(oauth.res.status).toHaveBeenCalledWith(500)
  })

  it('should redirect home with an error message', () => {
    oauth = new OAuth(codeReq, res)
    expect(oauth.res.redirect).toHaveBeenCalledWith('/?message=error')
  })
})

describe('oauth successfully recieves an authorization code', () => {
  var res
  var oauth
  var codeReq
  var code
  beforeAll(() => {
    res = mockResponse()
    code = cryptoRandomString({ length: 9 })
    codeReq = mockCodeRequest(code)
    oauth = new OAuth(codeReq, res)
  })

  it('should not be missing an auth code', () => {
    expect(!oauth.authCode).toBe(false)
  })

  it('should successfully generate options for a post', () => {
    // console.log(process.env.SLACK_CLIENT_ID)
    expect(oauth._options).toEqual({
      url: 'https://slack.com/api/oauth.v2.access',
      qs: {
        client_id: process.env.SLACK_CLIENT_ID,
        client_secret: process.env.SLACK_CLIENT_SECRET,
        code: code
      }
    })
  })
})

describe('oauth should inherit ability to cipher tokens', () => {
  var res
  var oauth
  var codeReq
  var code
  var testCrypto
  beforeAll(()=> {
    res = mockResponse()
    code = cryptoRandomString({ length: 9 })
    codeReq = mockCodeRequest(code)
    oauth = new OAuth(codeReq, res)
    testCrypto = new TestCrypto()
    oauth.tokenKey = testCrypto.tokenKey
  })

  it('should have token encrypt function', ()=> {
    testCrypto.tokenCipher = oauth.encrypt(testCrypto.tokenPlain)
    expect(testCrypto.isValidCipher).toBe(true)
  })
})
