'use strict'

const request = jest.genMockFromModule('request')
const { mockTokenRequest }= require('../apps/credential/test-data/oauth-data')

const mockTokenResponse = () => {
  const res = {}
  res.body = jest.fn().mockReturnValue(res)
  return res
}

const post = jest.fn ((options, callback) => {
  let tokenResponse = mockTokenResponse()
  tokenResponse.body(mockTokenRequest)
  return tokenResponse
})


// const post = jest.fn(() => {
//   let tokenResponse = mockTokenResponse()
//   tokenResponse.body(mockTokenRequest)
//   return Promise.resolve(tokenResponse)
// })

// const post = jest.fn(() => {
//   Promise.resolve(mockTokenRequest)
// })

// const post = (options, callback) => {
//   return mockTokenRequest
// }

// const post = (options) => {
//   return {
//     body: {
//     ok: true,
//     app_id: 'AHB2H4ABX',
//     authed_user: {
//       id: '123456'
//     },
//     scope: 'commands',
//     token_type: 'bot',
//     access_token: '123456',
//     bot_user_id: '123456',
//     team: {
//       id: '123456789',
//       name: 'USAF Bots'
//     },
//     enterprise: null
//   }}
// }

// May be covering default behavior?
// request.post = post 

request.post = post
module.exports = request;
