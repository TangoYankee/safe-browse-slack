'use strict'

const bodyParser = require('body-parser')
const express = require('express')
const router = require('./routes')

const app = express()

app.set('view engine', 'pug')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(router)
app.use((req, res, next) => {
  res.status(404).render('index', { message: 'page-not-found' })
})

const server = app.listen(4390)

module.exports = server
