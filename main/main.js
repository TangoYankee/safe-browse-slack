'use strict'

const bodyParser = require('body-parser')
const express = require('express')
const { publish, remove } = require('../apps/messages/methods')
const OAuth = require('../apps/credential/oauth')
const Signature = require('../apps/credential/signature')
const ThreatUrls = require('../apps/threat-urls/threat-urls')
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

app.post('/safebrowse', (req, res) => {
  /* check urls for suspected threats with google safe browse api */
  if (new Signature(req).isValid) {
    var text = req.body.text
    var userID = req.body.user_id
    if (text.toLowerCase() === 'help') {
      /* user asks for help */
      res.json(new HelpBlock(userID, 'type */safebrowse* followed by unformatted urls.\nWe will check them for suspected threats').message)
    } else if (text === '') {
      /* user input is empty */
      res.json(new HelpBlock(userID, 'we did not find any urls to check').message)
    } else {
      var urls = new ThreatUrls(req.body.text).threatUrls
      console.log(urls)
      res.send()
    }
    // Send text to process by regex. Have Regex return list of URLS
    // Create object that holds list of urls, status of chache check [unchecked, errorCheck, inCache, notInCache]
    // Lookup URLs in Cache, update object
    // Lookup URLs in SafeBrowse
    // Construct Message
  } else {
    res.status(400).send('Ignore this request')
  }
})

app.post('/publish', (req, res) => {
  /* send message in response to user input from slash command */
  if (new Signature(req).isValid) {
    publish(req.body, res)
  } else {
    res.status(400).send('Ignore this request')
  }
})

// No longer necessary. Only sharing emphemeral messages
app.post('/remove', (req, res) => {
  /* delete messages already posted */
  if (new Signature(req).isValid) {
    var requestBody = JSON.parse(req.body.payload)
    remove(requestBody, res)
  } else {
    res.status(400).send('Ingore this request')
  }
})

app.use((req, res, next) => {
  /* render 404 message on home page */
  res.status(404).render('index', { message: 'page-not-found' })
})

var server = app.listen(4390)

module.exports = server
