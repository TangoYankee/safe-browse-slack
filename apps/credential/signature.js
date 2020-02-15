'use strict'

const crypto = require('crypto')
const qs = require('qs')

class Signature { 
  constructor (req) {
    this.req = req
    this.version = 'v0'
    this.timeTolerance = 3e2    
  }

  isRecent () {
    /* guard against replay attacks */
    var currentTime = Math.floor(new Date().getTime() / 1000)
    var timestamp = Number(this.req.headers['x-slack-request-timestamp'])
    var timeDelta = Math.abs(currentTime - timestamp)
    return (timeDelta <= this.timeTolerance)
  }

  isValidHash () {
  /* calculated application signature and slack signature match */
    var reqBody = qs.stringify(this.req.body, { format: 'RFC1738' })
    var baseString = `${this.version}:${this.timestamp}:${reqBody}`
    var signingSecret = process.env.SLACK_SIGNING_SECRET
    var hexDigest = crypto.createHmac('sha256', signingSecret).update(`${baseString}`).digest('hex')
    var appSignature = `${version}=${hexDigest}`
    var slackSignature = request.headers['x-slack-signature']
    return (crypto.timingSafeEqual(
      Buffer.from(appSignature, 'utf-8'),
      Buffer.from(slackSignature, 'utf-8'))
  )
}

  isValidSignature () {
  /* request sent within 5 minutes and with correct hash */
    if (this.isRecent() && this.isValidHash()){
      return true
    } else {
      return false
    }
  }
}

module.exports = { Signature}
