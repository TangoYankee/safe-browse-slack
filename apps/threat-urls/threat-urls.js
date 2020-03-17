'use strict'

class ThreatUrls {
  constructor (text) {
    this.text = text
    this.escapedSections = this._escapedSections
    this.wholeUrls = this._wholeUrls
    this.urlDomains = this._urlDomains
    this.bareUrls = this._bareUrls
    this.threatUrls = this._threatUrls
  }

  get _escapedSections () {
    /* portion of text that link somewhere */
    var escapeRegex = /<.*?(\||>)/gm
    var escapedSections = this.text.match(escapeRegex)
    return (escapedSections || [])
  }

  get _wholeUrls () {
    /* List of all submitted urls */
    var wholeUrlRegex = /(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-zA-Z0-9]+([-.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/.*)*?/gm
    if (this.escapedSections) {
      return this.escapedSections.filter(section => section.match(wholeUrlRegex))
    } else {
      return []
    }
  }

  get _urlDomains () {
    /* Sumbitted URLS with http and www prefixes removed */
    var urlDomainRegex = /(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)/gm
    return this.wholeUrls.map(wholeUrl => wholeUrl.replace(urlDomainRegex, ''))
  }

  get _bareUrls () {
    /* Urls with escape characters removed */
    var bareUrlsRegex = /[<(>||)]/gm
    return this.urlDomains.map(urlDomain => urlDomain.replace(bareUrlsRegex, ''))
  }

  get _threatUrls () {
    /* eliminate duplicate entries */
    var trailingSlashRegex = /\/$/gm
    var removedTrailingUrls = this.bareUrls.map(bareUrl => bareUrl.replace(trailingSlashRegex, ''))
    var uniqueUrls = new Set(removedTrailingUrls)
    return [...uniqueUrls]
  }
}

module.exports = ThreatUrls
