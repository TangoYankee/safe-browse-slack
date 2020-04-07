'use strict'

class ThreatReports {
  /* Stores data from user request, cache report, and safe browse report */
  constructor (urls) {
    this.allUrls = urls
    this.threatCacheReport = {}
    this.lookupAPIReport = []
  }

  get notInCache () {
    /* filter all urls into urls not in cache */
    // Should just be 'not in this.threatCacheReport
    return this.allUrls.filter(url => !Object.keys(this.threatCacheReport).includes(url))
  }

  get toCache () {
    /* transform safe browse error path into empty object */
    return (this.lookupAPIReport.message === undefined && this.lookupAPIReport.matches !== undefined) ? this.lookupAPIReport.matches : []
  }

  get toBlocks () {
    /* combine all urls, cache results, and safe browse */
    var toBlocksReport = JSON.parse(JSON.stringify(this.threatCacheReport))
    var notInCacheOrSafeBrowse = JSON.parse(JSON.stringify(this.notInCache))
    if (this.lookupAPIReport.message !== undefined) {
      /* safe browse has an error message */
      for (const url of this.notInCache) {
        toBlocksReport[url] = { threatMatch: 'SAFE_BROWSE_ERROR' }
      }
    } else if (this.lookupAPIReport.matches) {
      /* safe browse returned threat matches */
      for (var match of this.lookupAPIReport.matches) {
        toBlocksReport[match.threat.url] = { threatMatch: match.threatType }
        notInCacheOrSafeBrowse.splice(notInCacheOrSafeBrowse.indexOf(match.threat.url), 1)
      }
      /* remaining urls not in cache or matches will be added to block */
      for (const url of notInCacheOrSafeBrowse) {
        toBlocksReport[url] = {
          threatMatch: 'NONE_FOUND'
        }
      }
    } else {
      /* safe browse returned matchless */
      for (const url of this.notInCache) {
        toBlocksReport[url] = { threatMatch: 'NONE_FOUND' }
      }
    }
    return toBlocksReport
  }
}

module.exports = ThreatReports
