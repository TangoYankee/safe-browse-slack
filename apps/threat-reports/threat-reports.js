'use strict'

class ThreatReports {
  /* Stores data from user request, cache report, and safe browse report */
  constructor(urls) {
    this.urls = urls
  }

  get allUrls () {
    var allUrlsReport = {}
    for (var url of this.urls){
      allUrlsReport[url] = {}
    }
    return allUrlsReport
  }
}

module.exports = ThreatReports
