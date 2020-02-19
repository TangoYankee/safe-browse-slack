'use strict'

const queryString = require('querystring')
const { TokenCrypto } = require('./token-crypto')

class OAuth {
  constructor (codeReq, res) {
    this.res = res
    this.codeReq = codeReq
    this.authCode = this.setAuthCode()
  }

  setAuthCode () {
    try {
      return this.codeReq.query.code
    } catch (e) {
      console.warn(`authorization code not recieved. Error: ${e}`)
      return ''
    }
  }

  get options () {
    return {
      url: 'https://slack.com/api/oauth.v2.access',
      qs: {
        client_id: process.env.SLACK_CLIENT_ID,
        client_secret: process.env.SLACK_CLIENT_SECRET,
        code: this.authCode
      }
    }
  }

  sendResponse (statusCode) {
    return this.res.status(statusCode)
  }

  sendRedirect (message) {
    var thisQueryMessage = queryString.stringify({ message: message })
    return this.res.redirect('/?' + thisQueryMessage)
  }
}

class OAuthToken extends TokenCrypto {
  constructor(){
    super()
  }
}

// class OAuthPost {
//   constructor (res, authCode) {
//     this.url = 'https://slack.com/api/oauth.v2.access'
//     this.authCode = authCode
//     this.thisQueryString = this._setThisQueryString()
//   }

//   _setThisQueryString() {
//     return {
//       client_id: process.env.SLACK_CLIENT_ID,
//       client_secret: process.env.SLACK_CLIENT_SECRET,
//       code: this.AuthCode
//     }
//   }

// }

// class OAuthFlow {
//   constructor (slackReq, appRes) {
//     this.code = new OAuthCode(slackReq)
//     this.res = appRes
//   }

//   get resStatus () {
//     if (!this.code.exists) {
//       this.res.status(500)
//     }
//   }
// }

// class OAuthCode {
//   constructor (slackReq) {
//     this.slackReq = slackReq
//   }

//   get exists () {
//     /* can only proceed if code exists to return to slack */
//     return (!this.slackReq.query.code === false)
//   }
// }

module.exports = {
  OAuth,
  OAuthToken
}
