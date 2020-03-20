'use strict'

const express = require('express')

const { getHome, getPrivacy, getOAuth, postSafeBrowse } = require('./controllers')

const router = express.Router()
router.get('/', getHome)
router.get('/privacy', getPrivacy)
router.get('/oauth', getOAuth)
router.post('/safebrowse', postSafeBrowse)

module.exports = router
