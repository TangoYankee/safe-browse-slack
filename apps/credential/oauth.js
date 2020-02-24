'use strict'

const process = require('process')
const queryString = require('querystring')
const request = require('request')
const { saveTeam } = require('../database/db.js')
const { TokenCrypto } = require('./token-crypto')

const oauth = (req, res) => {
  /* compose Slack credentials */
  if (!req.query.code) {
    console.warn('oauth error with code 500')
    res.status(500)
    var thisQueryMessage = queryString.stringify({ message: 'error' })
    res.redirect('/?' + thisQueryMessage)
  } else {
    var url = 'https://slack.com/api/oauth.v2.access'
    var thisQueryString = {
      client_id: process.env.SLACK_CLIENT_ID,
      client_secret: process.env.SLACK_CLIENT_SECRET,
      code: req.query.code
    }
    postOAuth(res, url, thisQueryString)
  }
}

const postOAuth = (res, url, thisQueryString) => {
  /* recieve authorization */
  var thisQueryMessage
  request.post({
    url: url,
    qs: thisQueryString
  }, (error, response, body) => {
    if (error) {
      console.warn('oauth fail to recieve authorization')
      thisQueryMessage = queryString.stringify({ message: 'error' })
      res.redirect('/?' + thisQueryMessage)
    } else {
      var bodyJson = JSON.parse(body)
      var teamId = bodyJson.team.id
      var accessTokenPlain = bodyJson.access_token
      if (teamId && accessTokenPlain) {
        var accessTokenCipher = new TokenCrypto().encrypt(accessTokenPlain)
        saveTeam(teamId, accessTokenCipher)
        thisQueryMessage = queryString.stringify({ message: 'success' })
        res.redirect('/?' + thisQueryMessage)
      } else {
        console.warn('oauth failed to recieve team ID/access token')
        thisQueryMessage = queryString.stringify({ message: 'error' })
        res.redirect('/?' + thisQueryMessage)
      }
    }
  })
}

module.exports = { oauth }
