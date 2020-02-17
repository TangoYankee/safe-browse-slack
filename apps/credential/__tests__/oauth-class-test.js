'use strict'

const { OAuthCode } = require('../oauth-class')
const { TestCipher } = require('../test-data/token-crypto-data')
const { resApp, reqSlackCode, reqSlackToken } = require('../test-data/oauth-data')
const cryptoRandomString = require('crypto-random-string')

describe('oauth successfully recieves an authorization code', () => {
  var appCodeRes
  var slackCodeReq
  var oauth
  var code
  beforeAll(() => {
    appCodeRes = JSON.parse(JSON.stringify(resApp))
    slackCodeReq = JSON.parse(JSON.stringify(reqSlackCode))
    code = cryptoRandomString({ length: 9 })
    slackCodeReq.query.code = code
    console.log(`slack req code: ${slackCodeReq.query.code}`)
    oauth = new OAuthCode(slackCodeReq, appCodeRes)
  })

  it('should reflect code is present', () => {
    console.log(`oauth object code: ${oauth.slackReq.query.code}`)
    expect(oauth.isCodeExists).toBe(true)
  })
})

describe('oauth fails to recieve an authorization code', () => {
  var appCodeRes
  var slackCodeReq
  var oauth
  var code
  beforeAll(() => {
    appCodeRes = JSON.parse(JSON.stringify(resApp))
    slackCodeReq = JSON.parse(JSON.stringify(reqSlackCode))
    code = ''
    slackCodeReq.query.code = code
    oauth = new OAuthCode(slackCodeReq, appCodeRes)
  })

  it('should reflect code is missing', () => {
    expect(oauth.isCodeExists).toBe(false)
  })
})

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
