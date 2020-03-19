'use strict'

const { threatMap } = require('./threat-map')

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

module.exports = {
  mockLookupResponse,
  mockFailedLookupResponse
}
