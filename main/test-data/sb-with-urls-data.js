'use strict'

const { threatMap } = require('./threat-map')


const mockIncomingText = (threatTypes) => {
  var text = ''
  for (var threatType of threatTypes){
    text += `<${threatMap[threatType].url}> `
  }
  return text
}

const mockThreatCacheReport = (threatTypes) => {
  var report = {}
  for (var threatType of threatTypes){
    report[threatMap[threatType].url] = {
      threatMatch : threatMap[threatType].threatType
    }
  }
  return report
}

const mockFailedLookupResponse = {
  body: {
  },
  headers: { data: '...' },
  request: { data: '...' },
  statusCodeError: 401
}

const mockLookupResponse = (threatEntries) => {
  var response = {}
  var threatMatches = mockThreatMatches(threatEntries)
  if (threatMatches.length < 1) {
    response = {}
  } else {
    response = { matches: threatMatches }
  }
  return response
}

const mockThreatMatches = (threatEntries) => {
  var threatMatches = []
  for (var threatEntry of threatEntries) {
    if (threatEntry !== 'NONE_FOUND') {
      threatMatches.push(mockThreat(threatEntry))
    }
  }
  return threatMatches
}

const mockThreat = (threatEntry) => {
  return {
    cacheDuration: '300s',
    platformType: 'ANY_PLATFORM',
    threat: {
      url: threatMap[threatEntry].url
    },
    threatEntryType: 'URL',
    threatType: threatEntry
  }
}

var reportText = "testsafebrowsing.appspot.com/s/phishing.html -reported <https://googleonlinesecurity.blogspot.com/2015/11/safe-browsing-protection-from-even-more.html|social engineering> :biohazard_sign:,\ntestsafebrowsing.appspot.com/s/unwanted.html -reported <https://www.google.com/about/unwanted-software-policy.html|unwanted software> :no_entry_sign:,\ntestsafebrowsing.appspot.com/s/malware.html -reported <https://www.stopbadware.org/|malware> :beetle:,\ndmv.ca.gov -reported <https://developers.google.com/safe-browsing/v4/advisory|no suspected harmful content> :small_blue_diamond:,\n"
const mockThreatReport = { "body": {
          "blocks": [{
            "text": {
              "text": reportText,
              "type": "mrkdwn"
            },
            "type": "section"
          }, {
            "type": "divider"
          }, {
            "elements": [{
              "text": "For more info, explore <https://developers.google.com/safe-browsing/v4/advisory|Google Safe Browse>", 
              "type": "mrkdwn"
            }],
            "type": "context"
          }],
          "response_type": "ephemeral"
        },
        "json": true,
        "url": "https://hooks.slack.com/commands/"
      }

module.exports = {
  mockIncomingText,
  mockThreatCacheReport,
  mockLookupResponse,
  mockFailedLookupResponse,
  mockThreatReport
}
