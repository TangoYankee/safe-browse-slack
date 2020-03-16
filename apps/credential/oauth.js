'use strict'

const requestPromise = require('request-promise')
const { TokenCrypto } = require('./token-crypto')

class OAuth extends TokenCrypto {
  /* OAuth2 protocol with ability to encrypt/decrypt auth tokens*/
  constructor (codeReq, res) {
    super(codeReq, res)
    this.res = res
    this.codeReq = codeReq
    this.authCode = this._authCode
  }

  get _authCode () {
    /* Authorization code recieved from target service */
    if (this.codeReq.query.code) {
      return this.codeReq.query.code
    } else {
      console.warn('authorization code not received.')
      this.res.status(500)
      this.res.redirect('/?message=error')
      return ''
    }
  }

  async setTokenInfo () {
    /* provide current token or request one with code */
    if (this.tokenInfo) {
      return this.tokenInfo
    } else if (this.codeReq.query.code) {
      this.tokenInfo = await this._tokenBody
      return this.tokenInfo
    } else {
      this.tokenInfo = ''
      return this.tokenInfo
    }
  }

  get _tokenBody () {
    /* exchange code for authorization token */
    return requestPromise.post(this._options)
      .then(response => {
        var responseBodyJSON = JSON.parse(response)
        if (responseBodyJSON.ok) {
          var tokenInfo = {
            access_cipher: this.encrypt(responseBodyJSON.access_token),
            team_id: responseBodyJSON.team.id
          }
          this.res.status(200)
          this.res.redirect('/?message=success')
          return (tokenInfo)
        } else {
          throw new Error('oauth failed to recieve team ID and/or access token')
        }
      })
      .catch(error => {
        console.warn(error)
        this.res.status(400)
        this.res.redirect('/?message=error')
        return error
      })
  }

  get _options () {
    /* format request parameters specific to slack oauth2 version 2 */
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
