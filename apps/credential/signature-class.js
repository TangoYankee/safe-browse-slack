'use strict'

class Signature {
  constructor(req){
    this.req = req
    this.timeTolerance = 3e2
  }

  get slackSignature () {
    return this.req.headers['x-slack-signature']
  }

  get _isRecent () {
    var currentTime = Math.floor(new Date().getTime()/1e3)
    var timestamp = Number(this.req.headers['x-slack-request-timestamp'])
    var timeDelta = Math.abs(currentTime-timestamp)
    return (timeDelta <= this.timeTolerance)
  }
}

module.exports = {
  Signature
}
