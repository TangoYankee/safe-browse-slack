'use strict'

const request = require('request')
const { TokenCrypto } = require('./token-crypto')

class OAuth extends TokenCrypto {
  constructor (codeReq, res) {
    super(codeReq, res)
    this.res = res
    this.codeReq = codeReq
    this.authCode = this._authCode
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

  setTokenBody () {
    if (this.tokenBody) {
      return this._tokenBody
    } else {
      this.tokenBody = this._tokenBody
      return this.tokenBody
    }
  }

  get _tokenBody () {
    return new Promise((resolve, reject) => {
      request.post(this._options)
        .then(response => {
          this.res.redirect('/?message=success')
          console.log(`response body: ${response.body}`)
          resolve(response.body)
        })
        .catch(error => {
          console.warn('oauth failed to recieve authorization')
          this.res.redirect('/?message=error')
          reject(error)
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
