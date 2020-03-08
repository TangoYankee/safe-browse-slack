'use strict'

const { threatMap } = require('../class-test-data/threat-map')

const mockFailedSafeBrowseResponse = {
  body: {
  },
  headers: { data: '...' },
  request: { data: '...' },
  statusCode: 401
}

const mockSafeBrowseResponse = (threatEntries) => {
  var response = {}
  response.statusCode = 200
  response.headers = { data: '...' }
  response.request = { data: '...' }
  var threatMatches = mockThreatMatches(threatEntries)
  if (threatMatches.length < 1) {
    response.body = {}
  } else {
    response.body = { matches: threatMatches }
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

module.exports = {
  mockSafeBrowseResponse,
  mockFailedSafeBrowseResponse
}
