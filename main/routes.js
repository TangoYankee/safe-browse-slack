'use strict'

const express = require('express')

const {
  redirectToLanding, getLanding, getPrivacy,
  getOAuth, postSafeBrowse
} = require('./controllers')

const router = express.Router()
router.get('/', redirectToLanding)
router.get('/safebrowse', getLanding)
router.get('/privacy', getPrivacy)
router.get('/oauth', getOAuth)
router.post('/sb-command', postSafeBrowse)

module.exports = router
