'use strict'

const { OAuth, OAuthToken } = require('../oauth-class')
const { TestCrypto } = require('../test-data/token-crypto-data')
const { mockResponse, mockCodeRequest, mockTokenRequest } = require('../test-data/oauth-data')
const cryptoRandomString = require('crypto-random-string')

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
    expect(oauth.options).toEqual({
      url: 'https://slack.com/api/oauth.v2.access',
      qs: {
        client_id: process.env.SLACK_CLIENT_ID,
        client_secret: process.env.SLACK_CLIENT_SECRET,
        code: code
      }
    })
  })
})

describe('oauthToken should inherit ability to cipher tokens', () => {
  var oauthToken
  var testCrypto
  beforeAll(()=> {
    oauthToken = new OAuthToken()
    testCrypto = new TestCrypto()
    oauthToken.tokenKey = testCrypto.tokenKey
  })

  it('should have token encrypt function', ()=> {
    testCrypto.tokenCipher = oauthToken.encrypt(testCrypto.tokenPlain)
    expect(testCrypto.isValidCipher).toBe(true)
  })
})

// describe('oauth successfully recieves an authorization code', () => {
//   var appCodeRes
//   var slackCodeReq
//   var oauth
//   var code
//   beforeAll(() => {
//     appCodeRes = JSON.parse(JSON.stringify(resApp))
//     slackCodeReq = JSON.parse(JSON.stringify(reqSlackCode))
//     code = cryptoRandomString({ length: 9 })
//     slackCodeReq.query.code = code
//     console.log(`slack req code: ${slackCodeReq.query.code}`)
//     oauth = new OAuthFlow(slackCodeReq, appCodeRes)
//   })

//   it('should reflect code is present', () => {
//     console.log(`oauth object code: ${oauth.code.slackReq.query.code}`)
//     expect(oauth.code.exists).toBe(true)
//   })
// })

// describe('oauth fails to recieve an authorization code', () => {
//   var appCodeRes
//   var slackCodeReq
//   var oauth
//   var code
//   beforeAll(() => {
//     appCodeRes = JSON.parse(JSON.stringify(resApp))
//     slackCodeReq = JSON.parse(JSON.stringify(reqSlackCode))
//     code = ''
//     slackCodeReq.query.code = code
//     oauth = new OAuthFlow(slackCodeReq, appCodeRes)
//   })

//   it('should reflect code is missing', () => {
//     expect(oauth.code.exists).toBe(false)
//   })

//   it('should set the response status to 500', () => {
//     expect(oauth.res.status).toEqual
//   })
// })

// describe('oauth class exists', () => {
//   var oauth
//   var appCodeRes
//   var appTokenRes
//   var slackCodeReq
//   var slackTokenReq
//   var code
//   beforeAll(() => {
//     appCodeRes = JSON.parse(JSON.stringify( resApp ))
//     appTokenRes = JSON.parse(JSON.stringify( resApp ))
//     slackCodeReq = JSON.parse(JSON.stringify( reqSlackCode ))
//     slackTokenReq = JSON.parse(JSON.stringify( reqSlackToken ))
//     code = cryptoRandomString({length: 9})
//     slackCodeReq.query.code = code
//     oauth = new OAuth(slackCodeReq)
//   })

//   it('should check whether there is a code from slack',
//   () => {
//     expect(oauth.isCodeExists = true)
//   })
// })
