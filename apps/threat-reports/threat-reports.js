'use strict'

class ThreatReports {
  /* Stores data from user request, cache report, and safe browse report */
  constructor (urls) {
    this.allUrls = urls
    this.fromCache = {}
    this.fromSafeBrowse = {}
  }

  get notInCache () {
    /* filter all urls into urls not in cache */
    return this.allUrls.filter(url => !Object.keys(this.fromCache).includes(url))
  }

  get toCache () {
    /* transform safe browse error path into empty object */
    return {}
  }
}

module.exports = ThreatReports
