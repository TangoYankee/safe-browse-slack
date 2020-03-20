'use strict'

const bodyParser = require('body-parser')
const express = require('express')
const requestPromise = require('request-promise')

const OAuth = require('../apps/credential/oauth')
const Signature = require('../apps/credential/signature')
const ThreatUrls = require('../apps/threat-urls/threat-urls')
const ThreatReports = require('../apps/threat-reports/threat-reports')
const ThreatCache = require('../apps/threat-cache/threat-cache')
const LookupAPI = require('../apps/lookup-api/lookup-api')
const HelpBlock = require('../apps/blocks/help-block')
const ReportBlock = require('../apps/blocks/report-block')

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
    var helpBlock = new HelpBlock()
    var welcomeMessage = helpBlock.message(userID, 'type */safebrowse* followed by unformatted urls.\nWe will check them for suspected threats')
    var errorMessage = helpBlock.message(userID, 'we did not find any urls to check')

    if (text.toLowerCase() === 'help') {
      res.json(welcomeMessage)
    } else if (text === '') {
      res.json(errorMessage)
    } else {
      var urls = new ThreatUrls(text).threatUrls
      if (urls.length === 0) {
        res.json(errorMessage)
      } else {
        res.send()
        var threatReports = new ThreatReports(urls)
        var threatCache = new ThreatCache()
        threatReports.threatCacheReport = threatCache.report(threatReports.allUrls)
        var lookupAPI = new LookupAPI()
        threatReports.lookupAPIReport = await lookupAPI.report(threatReports.notInCache)
        var reportMessage = new ReportBlock().message(threatReports.toBlocks)
        var requestOptions = {
          url: req.body.response_url,
          body: reportMessage,
          json: true
        }
        requestPromise.post(requestOptions)
          .catch(error => {
            console.warn(error)
          })
        console.log(urls)
        // Construct Message
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
