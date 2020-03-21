'use strict'

const requestPromise = require('request-promise')

const OAuth = require('../apps/credential/oauth')
const Signature = require('../apps/credential/signature')
const ThreatUrls = require('../apps/threat-urls/threat-urls')
const ThreatReports = require('../apps/threat-reports/threat-reports')
const ThreatCache = require('../apps/threat-cache/threat-cache')
const LookupAPI = require('../apps/lookup-api/lookup-api')
const HelpBlock = require('../apps/blocks/help-block')
const ReportBlock = require('../apps/blocks/report-block')

const redirectToLanding = (req, res) => {
  res.status(200)
  res.redirect('safebrowse')
}

const getLanding = (req, res) => {
  /* home page viewable from web browser */
  res.render('index', { message: req.query.message })
}

const getPrivacy = (req, res) => {
  /* privacy policy */
  res.render('privacy')
}

const getOAuth = async (req, res) => {
  /* oauth with Slack */
  var oauth = new OAuth(req, res)
  await oauth.setTokenInfo()
}

const postSafeBrowse = async (req, res) => {
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
        threatCache.store(threatReports.toCache)
      }
    }
  } else {
    res.status(400).send('Ignore this request')
  }
}

module.exports = {
  redirectToLanding,
  getLanding,
  getPrivacy,
  getOAuth,
  postSafeBrowse
}
