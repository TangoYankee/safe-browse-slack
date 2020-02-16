'use strict'

const crypto = require('crypto')
const qs = require('qs')

class Signature {
  /* request is properly signed */
  constructor(req){
    this.req = req
    this.version = 'v0'
    this.timeTolerance = 3e2
    this.timestamp = Number(req.headers['x-slack-request-timestamp'])
    this.currentTime = Math.floor(new Date().getTime()/ 1e3)
  }

  get isValid () {
    /* request was sent recently and matches slack credentials */
    return (this._isRecent && this._isCorrectSignature)
  }

  get _isRecent () {
    /* guard against replay attacks */
    var timeDelta = Math.abs(this.currentTime-this.timestamp)
    return (timeDelta <= this.timeTolerance)
  }

  get _isCorrectSignature () {
    /* calculated application signature and slack signature match */
      var reqBody = qs.stringify(this.req.body, { format: 'RFC1738' })
      var baseString = `${this.version}:${this.timestamp}:${reqBody}`
      var signingSecret = process.env.SLACK_SIGNING_SECRET
      var hexDigest = crypto.createHmac('sha256', signingSecret).update(`${baseString}`).digest('hex')
      var appSignature = `${this.version}=${hexDigest}`
      var slackSignature = this.req.headers['x-slack-signature']
      return (crypto.timingSafeEqual(
        Buffer.from(appSignature, 'utf-8'),
        Buffer.from(slackSignature, 'utf-8'))
      )
    }
}

module.exports = {
  Signature
}
