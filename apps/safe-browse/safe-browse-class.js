'use strict'

const requestPromise = require('request-promise')

class SafeBrowse {
  constructor (urlDomainKeys) {
    this.urlDomainKeys = urlDomainKeys
  }

  get _threatMatches () {
    if (this.urlDomainKeys.length > 1) {
      return this._callSafebrowse
    } else {
      return {}
    }
  }

  get _callSafebrowse () {
    return requestPromise.post(this._options)
      .then(response => {
        if (response.statusCode === 200) {
          return response.body
        } else {
          throw new Error(`safe browse response code: ${response.statusCode}`)
        }
      })
      .catch(error => {
        console.warn(error)
        return error
      })
  }

  get _options () {
    return {
      url: 'https://safebrowsing.googleapis.com/v4/threatMatches:find',
      body: this._requestBody,
      json: true,
      timeout: 1500,
      qs: { key: process.env.GOOGLE_SAFE_BROWSING_KEY }
    }
  }

  get _requestBody () {
    return {
      client: {
        clientId: process.env.GOOGLE_SAFE_BROWSING_CLIENT_ID,
        clientVersion: '1.5.2'
      },
      threatInfo: {
        platformTypes: ['ANY_PLATFORM'],
        threatEntries: this._threatEntries,
        threatEntryTypes: ['URL'],
        threatTypes: [
          'THREAT_TYPE_UNSPECIFIED',
          'MALWARE',
          'SOCIAL_ENGINEERING',
          'UNWANTED_SOFTWARE',
          'POTENTIALLY_HARMFUL_APPLICATION'
        ]
      }
    }
  }

  get _threatEntries () {
    var threatEntries = []
    for (var urlDomainKey of new Set(this.urlDomainKeys)) {
      threatEntries.push({ url: urlDomainKey })
    }
    return threatEntries
  }
}

module.exports = {
  SafeBrowse
}
