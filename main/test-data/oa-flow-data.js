'use strict'

const cryptoRandomString = require('crypto-random-string')

const setTokenPlain = () => {
  /* emulate oauth token layouts */
  var token = 'xoxp'
  for (let i = 0; i < 3; i++) {
    token += '-'
    token += cryptoRandomString({ length: 12, characters: '0123456789' })
  }
  token += '-'
  token += cryptoRandomString({ length: 32 })
  return (token)
}

const mockTokenRequest = `{"ok": true, "app_id": "AHB2H4ABX", "authed_user": { "id": "UH00Z00Z0" }, "scope": "commands", "token_type": "bot", "access_token": "${setTokenPlain()}", "bot_user_id": "US0000ZZZ", "team": { "id": "ZZZZ0Z0ZZ", "name": "heroes" }, "enterprise": null}`

const mockFailedTokenRequest = '{"ok": false,"error": "invalid_code"}'

module.exports = {
  mockTokenRequest,
  mockFailedTokenRequest
}

