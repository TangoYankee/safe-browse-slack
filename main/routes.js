'use strict'

const express = require('express')

const {
  getLanding, getPrivacy,
  getOAuth, postSafeBrowse
} = require('./controllers')

const router = express.Router()
router.get('/', getLanding)
router.get('/privacy', getPrivacy)
router.get('/oauth', getOAuth)
router.post('/sb-command', postSafeBrowse)

module.exports = router
