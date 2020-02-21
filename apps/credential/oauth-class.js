'use strict'

const request = require('request')
const { TokenCrypto } = require('./token-crypto')

class OAuth extends TokenCrypto {
  constructor (codeReq, res) {
    super(codeReq, res)
    this.res = res
    this.codeReq = codeReq
    this.authCode = this._authCode
    this.tokenBody = ''
  }

  get teamID () {
    if (this.tokenBody !== 'error') {
      return this.tokenBody.team.id
    } else {
      return 'error'
    }
  }

  get tokenCipher () {
    if (this.tokenBody !== 'error') {
      return this.encrypt(this.tokenBody.access_token)
    } else {
      return 'error'
    }
  }

  get _authCode () {
    if (this.codeReq.query.code) {
      return this.codeReq.query.code
    } else {
      console.warn('authorization code not recieved.')
      this.res.status(500)
      this.res.redirect('/?message=error')
      return ''
    }
  }

  get _tokenBody () {
    return new Promise(resolve => {
      request.post(this._options,
        (tokenError, tokenRes, tokenBody) => {
          if (tokenError) {
            console.warn(`oauth failed to recieve authorization token with error: ${tokenError}`)
            tokenRes.redirect('/?message=error')
            this.tokenBody = 'error'
            resolve('error')
          }
          var tokenBodyJSON = JSON.parse(tokenBody)
          if (!tokenBodyJSON.team.id || !tokenBodyJSON.access_token) {
            console.warn('oauth failed to recieve team ID or access token')
            tokenRes.redirect('/?message=error')
            this.tokenBody = 'error'
            resolve('error')
          } else {
            tokenRes.redirect('/?message=success')
            this.tokenBody = tokenBodyJSON
            resolve(tokenBodyJSON)
          }
        })
    })
  }

  get _options () {
    return {
      url: 'https://slack.com/api/oauth.v2.access',
      qs: {
        client_id: process.env.SLACK_CLIENT_ID,
        client_secret: process.env.SLACK_CLIENT_SECRET,
        code: this.authCode
      }
    }
  }
}

module.exports = {
  OAuth
}
