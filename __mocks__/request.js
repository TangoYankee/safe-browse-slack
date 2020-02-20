'use strict'

const request = jest.genMockFromModule('request')

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

// request.post = post
module.exports = request;
