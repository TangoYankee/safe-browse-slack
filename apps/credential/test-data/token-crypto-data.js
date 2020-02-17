'use strict'

const cryptoRandomString = require('crypto-random-string')

class TestCrypto {
  constructor () {
    this.tokenKey = cryptoRandomString({ length: 32 })
    this.tokenPlain = this._setTokenPlain()
    this.tokenCipher = ''
  }

  _setTokenPlain () {
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

  get isValidCipher () {
    return (this.tokenCipher.length === 176 && !this.tokenCipher.includes('-'))
  }
}

module.exports = {
  TestCrypto
}
