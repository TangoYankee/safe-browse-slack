'use strict'
// Keep mostly intact

const requestPromise = require('request-promise')

class SafeBrowse {
  /* find threat matches for shared urls */
  constructor (urlDomainKeys) {
    this.urlDomainKeys = urlDomainKeys
  }

  get threatMatches () {
    /* only call safe browse if there is at least one threat url */
    if (this.urlDomainKeys.length > 0) {
      return this._callSafebrowse
    } else {
      return { body: {} }
    }
  }

  get _callSafebrowse () {
    /* recieve threat matches from safe browse */
    return requestPromise.post(this._options)
      .then(response => {
        if (response.statusCodeError) {
          throw new Error(`safe browse response code: ${response.statusCodeError}`)
        } else {
          return response
        }
      })
      .catch(error => {
        console.warn(error)
        return error
      })
  }

  get _options () {
    /* parameters for request to safe browse */
    return {
      url: 'https://safebrowsing.googleapis.com/v4/threatMatches:find',
      body: this._requestBody,
      json: true,
      timeout: 1500,
      qs: { key: process.env.GOOGLE_SAFE_BROWSING_KEY }
    }
  }

  get _requestBody () {
    /* threat entries added to standard safe browse request */
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
    /* key value pairs of unique urls */
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
