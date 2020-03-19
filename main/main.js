'use strict'

const bodyParser = require('body-parser')
const express = require('express')

const OAuth = require('../apps/credential/oauth')
const Signature = require('../apps/credential/signature')
const ThreatUrls = require('../apps/threat-urls/threat-urls')
const ThreatReports = require('../apps/threat-reports/threat-reports')
const ThreatCache = require('../apps/threat-cache/threat-cache')
const LookupAPI = require('../apps/lookup-api/lookup-api')
const HelpBlock = require('../apps/blocks/help-block')

var app = express()
app.set('view engine', 'pug')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => {
  /* home page viewable from web browser */
  var message = req.query.message
  res.render('index', { message: message })
})

app.get('/privacy', (req, res) => {
  /* privacy policy */
  res.render('privacy')
})

app.get('/oauth', async (req, res) => {
  /* oauth with Slack */
  var oauth = new OAuth(req, res)
  await oauth.setTokenInfo()
})

app.post('/safebrowse', async (req, res) => {
  /* check urls for suspected threats with google safe browse lookup api */
  if (new Signature(req).isValid) {
    var text = req.body.text
    var userID = req.body.user_id
    var welcomeMessage = new HelpBlock(userID, 'type */safebrowse* followed by unformatted urls.\nWe will check them for suspected threats').message
    var errorMessage = new HelpBlock(userID, 'we did not find any urls to check').message

    if (text.toLowerCase() === 'help') {
      res.json(welcomeMessage)
    } else if (text === '') {
      res.json(errorMessage)
    } else {
      var urls = new ThreatUrls(req.body.text).threatUrls
      if (urls.length === 0) {
        res.json(errorMessage)
      } else {
        var threatReports = new ThreatReports(urls)
        var threatCache = new ThreatCache()
        threatReports.threatCacheReport = threatCache.report(threatReports.allUrls)
        var lookupAPI = new LookupAPI()
        threatReports.lookupAPIReport = await lookupAPI.report(threatReports.notInCache)
        console.log(urls)
        // Construct Message
        res.send()
        threatCache.store(threatReports.toCache)
      }
    }
  } else {
    res.status(400).send('Ignore this request')
  }
})

app.use((req, res, next) => {
  /* render 404 message on home page */
  res.status(404).render('index', { message: 'page-not-found' })
})

var server = app.listen(4390)

module.exports = server
