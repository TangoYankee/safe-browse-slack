// const request = require('request')


// // Actually shows the recieved data
// const oauth = () => {
//   return new Promise((resolve, reject) => {
//     request.post("example.com")
//     .then(response => {
//       resolve(response)
//     }).catch(error => {
//       reject(error)
//     })
//   })
// }


// module.exports = oauth


'use strict'

const request = require('request')
const { TokenCrypto } = require('./token-crypto')

class OAuth extends TokenCrypto {
  constructor (codeReq, res) {
    super(codeReq, res)
    this.res = res
    this.codeReq = codeReq
    this.authCode = this._authCode
    this.tokenBody = { 
      access_token: '12345',
      team : {
        id: '6789'
      }
    }
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
    return new Promise((resolve, reject) => {
      request.post("example.com")
      .then(response => {
        resolve(response)
      }).catch(error => {
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

