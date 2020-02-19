'use strict'

const request = require('request')
const { saveTeam } = require('../database/db.js')
const { TokenCrypto } = require('./token-crypto')

class OAuth extends TokenCrypto{
  constructor (codeReq, res) {
    super(codeReq, res)
    this.res = res
    this.codeReq = codeReq
    this.authCode = this._authCode()
  }

  get _authCode() {
    if(this.codeReq.query.code) {
      return this.codeReq.query.code
    } else {
      console.warn('authorization code not recieved.')
      this.res.status(500)
      this.res.redirect('/?message=error')
      return ''
    }  
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

  // TODO: Mock the return of a value from Slack
  get tokenPlain () {
    request.post(this._options, 
      (tokenError, tokenRes, tokenBody) => {
        if(tokenError) {
          console.warn(`oauth failed to recieve authorization token with error: ${error}`)
          tokenRes.redirect(`/?message=error`)
        }
        var tokenBodyJSON = JSON.parse(tokenBody)
        if (!tokenBodyJSON.team.id || !tokenBodyJSON.access_token){
          console.warn('oauth failed to recieve team ID or access token')
          tokenRes.redirect('/?message=error')
          } else {
            saveTeam(tokenBodyJSON.team.id, this.encrypt(tokenBodyJSON.access_token))
            tokenRes.redirect(`/?message=success`)
          }
      })
  }
}

module.exports = {
  OAuth
}
