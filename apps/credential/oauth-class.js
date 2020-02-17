class OAuthCode{
  constructor(slackReq, appRes ){
    this.slackReq = slackReq
    this.appRes = appRes
  }

  get isCodeExists(){
    return (!this.slackReq.query.code === false)
  }
}

module.exports = {
  OAuthCode
}
