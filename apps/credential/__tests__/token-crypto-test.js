'use strict'

const { TokenCrypto } = require('../token-crypto')
const { TestCrypto } = require('../test-data/token-crypto-data')

describe('generate an oauth token and a key, then check that it is encrypted and decrypted', () => {
  var tokenCrypto
  var testCrypto
  beforeAll(() => {
    tokenCrypto = new TokenCrypto()
    testCrypto = new TestCrypto()
    tokenCrypto.tokenKey = testCrypto.tokenKey
  })

  it('should encrypt the token into a cipher that meets pre-set criteria',
    () => {
      testCrypto.tokenCipher = tokenCrypto.encrypt(testCrypto.tokenPlain)
      expect(testCrypto.isValidCipher).toBe(true)
    })

  it('should decrypt the cipher to match the original test token',
    () => {
      testCrypto.tokenCipher = tokenCrypto.encrypt(testCrypto.tokenPlain)
      expect(tokenCrypto.decrypt(testCrypto.tokenCipher)).toEqual(testCrypto.tokenPlain)
    })
})
