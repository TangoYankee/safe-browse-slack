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
  body: '{"ok": false,"error": "invalid_code"}'
}

module.exports = {
  mockResponse,
  mockCodeRequest,
  mockTokenRequest,
  mockFailedTokenRequest
}
