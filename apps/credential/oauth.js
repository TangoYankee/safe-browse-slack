'use strict'

// const request = require('request')
const requestPromise = require('request-promise')
const { TokenCrypto } = require('./token-crypto')

class OAuth extends TokenCrypto {
  constructor(codeReq, res) {
    super(codeReq, res)
    this.res = res
    this.codeReq = codeReq
    this.authCode = this._authCode
  }

  get _authCode() {
    if (this.codeReq.query.code) {
      return this.codeReq.query.code
    } else {
      console.warn('authorization code not recieved.')
      this.res.status(500)
      this.res.redirect('/?message=error')
      return ''
    }
  }

  async setTokenInfo() {
    if (this.tokenInfo) {
      return this.tokenInfo
    } else {
      this.tokenInfo = await this._tokenBody
      return this.tokenInfo
    }
  }

  // get _tokenBody () {
  //   return new Promise((resolve, reject) => {
  //     request.post(this._options)
  //       .then(response => {
  //         this.res.redirect('/?message=success')
  //         console.log(`response body: ${response.body}`)
  //         var tokenInfo = {
  //           access_cipher : this.encrypt(response.body.access_token),
  //           team_id : response.body.team.id
  //         }
  //         resolve(tokenInfo)
  //       })
  //       .catch(error => {
  //         console.warn('oauth failed to recieve authorization')
  //         this.res.redirect('/?message=error')
  //         reject(error)
  //       })
  //   })
  // }

  get _tokenBody() {
    return new Promise((resolve, reject) => {
      requestPromise.post(this._options)
        .then(response => {
          var responseBodyJSON = JSON.parse(response.body)
          if (responseBodyJSON.ok) {
            var tokenInfo = {
              access_cipher: this.encrypt(responseBodyJSON.access_token),
              team_id: responseBodyJSON.team.id
            }
            this.res.redirect('/?message=success')
            resolve(tokenInfo)
          } else {
            console.warn('oauth failed to recieve team ID and/or access token')
            this.res.redirect('/?message=error')
            reject('oauth failed to recieve team ID and/or access token')
          }
        })
        .catch(error => {
          console.warn('oauth failed to recieve authorization')
          this.res.redirect('/?message=error')
          reject(`authorizarion request failed with : ${error}`)
        })
    })
  }


  // get _tokenBody() {
  //   return new Promise((resolve, reject) => {
  //     request.post(this._options,
  //       (error, response) => {
  //         if (error) {
  //           console.warn('oauth failed to recieve authorization')
  //           this.res.redirect('/?message=error')
  //           reject(error)
  //         }
  //         else {
  //           console.log(`response body: ${response.body}`)
  //           var responseBodyJSON = JSON.parse(response.body)
  //           if (responseBodyJSON.ok) {
  //             var tokenInfo = {
  //               access_cipher: this.encrypt(responseBodyJSON.access_token),
  //               team_id: responseBodyJSON.team.id
  //             }
  //             this.res.redirect('/?message=success')
  //             resolve(tokenInfo)
  //           } else {
  //             console.warn('oauth failed to recieve team ID and/or access token')
  //             this.res.redirect('/?message=error')
  //             reject('error')
  //           }
  //         }
  //       })
  //   })
  // }

  get _options() {
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
