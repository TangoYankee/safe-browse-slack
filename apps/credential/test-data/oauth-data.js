'use strict'

const { TestCrypto } = require('../test-data/token-crypto-data')

const mockResponse = () => {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  res.redirect = jest.fn().mockReturnValue(res)
  return res
}

const mockCodeRequest = (code) => {
  return {
    query: {
      code: code
    }
  }
}

const mockTokenRequest = {
  body: `{"ok": true, "app_id": "AHB2H4ABX", "authed_user": { "id": "UH00Z00Z0" }, "scope": "commands", "token_type": "bot", "access_token": "${new TestCrypto().tokenPlain}", "bot_user_id": "US0000ZZZ", "team": { "id": "ZZZZ0Z0ZZ", "name": "heroes" }, "enterprise": null}`
}

const mockFailedTokenRequest = {
  "ok": false,
  "error": "invalid_code"
}

// const mockTokenRequest = () => {
//   return {
//     body: {
//       ok: true,
//       app_id: 'AHB2H4ABX',
//       authed_user: {
//         id: ''
//       },
//       scope: 'commands',
//       token_type: 'bot',
//       access_token: '12345',
//       bot_user_id: '',
//       team: {
//         id: 'heroes',
//         name: 'USAF Bots'
//       },
//       enterprise: null
//     }
//   }
// }

module.exports = {
  mockResponse,
  mockCodeRequest,
  mockTokenRequest
}
