'use strict'

const { OAuth } = require('../oauth-class')
const { TestCrypto } = require('../test-data/token-crypto-data')
const { mockResponse, mockCodeRequest } = require('../test-data/oauth-data')
const mockRequest = require("request")
// jest.mock('request') // request is not defined
// const request = require('request')
// const { Response} = require('request')
const cryptoRandomString = require('crypto-random-string')

// it('mocks request', () => {
//   request.mockReturnValue(Promise.resolve(new Response('error')))

//   var code = cryptoRandomString({ length: 9 })
//   var codeReq = mockCodeRequest(code)
//   var oauth = new OAuth(codeReq, res)
//   expect(request).toHaveBeenCalledTimes(1)

// })
// biblia/__tests__/search.test.js
// const search = require("../js/search");
// const mockAxios = require("axios")
// test("fetches results from google books api", () => {
//   mockAxios.get.mockImplementationOnce(() =>
//     Promise.resolve(dummy_response_data_here)
//   );
// return search.fetchBooks().then(response => {
//     expect(response).toEqual();
//   });
// });

// Create a mock OAuth response from slack

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
    spyOnMockRequest = spyOn(mockRequest, 'post')
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
  var spyOnMockRequest
  beforeEach(() => {
    spyOnMockRequest = spyOn(mockRequest, 'post')
    oauth = new OAuth(codeReq, res)
  })

  it('should not be missing an auth code', () => {
    expect(!oauth.authCode).toBe(false)
  })

  it('should call a mock request to slack for a token', () => {
    expect(spyOnMockRequest).toHaveBeenCalledTimes(1)
    // Need to mock an anonymous function call
    // expect(mockRequest.post).toHaveBeenCalledWith(oauth._options, (tokenError, tokenRes, tokenBody) => {
    //   console.log("entered callback")
    //   if (tokenError) {
    //     console.warn(`oauth failed to recieve authorization token with error: ${tokenError}`)
    //     tokenRes.redirect('/?message=error')
    //     resolve('error')
    //   }
    //   var tokenBodyJSON = JSON.parse(tokenBody)
    //   if (!tokenBodyJSON.team.id || !tokenBodyJSON.access_token) {
    //     console.warn('oauth failed to recieve team ID or access token')
    //     tokenRes.redirect('/?message=error')
    //     resolve('error')
    //   } else {
    //     tokenRes.redirect('/?message=success')
    //     resolve(tokenBodyJSON)
    //   }
    // })
    // expect(request.post).toHaveBeenCalledTimes(1)
    // console.log(oauth._options)
    // expect(mockRequest.post).toHaveBeenCalledWith({ url: 'https://slack.com/api/oauth.v2.access',
    // qs: 
    //  { client_id: '',
    //    client_secret: '',
    //    code: '' } })
    // mockRequest.post.mockImplementationOnce(() => 
    // Promise.resolve({
    //   body: {
    //   ok: true,
    //   app_id: 'AHB2H4ABX',
    //   authed_user: {
    //     id: '123456'
    //   },
    //   scope: 'commands',
    //   token_type: 'bot',
    //   access_token: '123456',
    //   bot_user_id: '123456',
    //   team: {
    //     id: '123456789',
    //     name: 'USAF Bots'
    //   },
    //   enterprise: null
    // }})
    // )
  })

  it('should return a token body', () => {
    expect(oauth.tokenBody).toEqual("error")
  })
})
