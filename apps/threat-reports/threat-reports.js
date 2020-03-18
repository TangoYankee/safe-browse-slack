'use strict'

class ThreatReports {
  /* Stores data from user request, cache report, and safe browse report */
  constructor(urls) {
    this.allUrls = urls
    this.fromCache = {}
  }

  // get allUrls() {
  //   /* urls as keys for threat values */
  //   var allUrlsReport = {}
  //   for (var url of this.urls) {
  //     allUrlsReport[url] = {}
  //   }
  //   return allUrlsReport
  // }

  get notInCache() {
    /* filter all urls into urls not in cache */
    return this.allUrls.filter(url => !Object.keys(this.fromCache).includes(url))
  }

}

module.exports = ThreatReports
