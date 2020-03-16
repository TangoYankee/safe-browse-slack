'use strict'

const bodyParser = require('body-parser')
const express = require('express')
const { publish, remove } = require('../apps/messages/methods')
const { OAuth } = require('../apps/credential/oauth')
const { Database } = require('../apps/database/db')
const { Signature } = require('../apps/credential/signature')

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
  var tokenInfo = await oauth.setTokenInfo()
  // Remove step to save in database
  if (tokenInfo.team_id && tokenInfo.access_cipher) {
    new Database('markdownlinks-sandbox').connectStoreDisconnect(tokenInfo.team_id, tokenInfo.access_cipher)
  }
})

app.post('/safebrowse', (req, res) => {
  /* check urls for suspected threats with google safe browse api */
  res.send()
  console.log(req.body)
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

const port = 4390
app.listen(port)
