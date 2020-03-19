'use strict'

const ThreatReports = require('../threat-reports')
const ThreatReportData = require('../test-data/threat-report-data')

describe('retrieve urls not stored in cache', () => {
  var urls = [
    'testsafebrowsing.appspot.com/s/phishing.html',
    'testsafebrowsing.appspot.com/s/unwanted.html',
    'testsafebrowsing.appspot.com/s/malware.html',
    'nasa.gov']
  var threatReportData = new ThreatReportData(urls)
  var threatReports = new ThreatReports(urls)

  it('should return urls that are not in the cache', () => {
    threatReports.threatCacheReport = threatReportData.urlsInCache
    expect(threatReports.notInCache).toEqual([
      'testsafebrowsing.appspot.com/s/unwanted.html',
      'nasa.gov'
    ])
  })
})

describe('consolidates possible lookup responses', () => {
  var urls = []
  var threatReportData = new ThreatReportData(urls)
  var threatReports = new ThreatReports(urls)

  it('should consolidate error lookup response into empty array', () => {
    threatReports.lookupAPIReport.messages = true
    expect(threatReports.toCache).toEqual([])
  })

  it('should turn empty lookup responses into empty arrays', () => {
    threatReports.lookupAPIReport = { body: {} }
    expect(threatReports.toCache).toEqual([])
  })

  it('should return threat matches reported by lookup API', () => {
    threatReports.lookupAPIReport = threatReportData.lookupAPIReport
    expect(threatReports.toCache).toEqual(threatReportData.lookupAPIReport.matches)
  })
})

describe('consolidates reports to send to block builder', () => {
  var urls = [
    'testsafebrowsing.appspot.com/s/phishing.html',
    'testsafebrowsing.appspot.com/s/unwanted.html',
    'testsafebrowsing.appspot.com/s/malware.html',
    'nasa.gov']
  var threatReportData = new ThreatReportData(urls)
  var threatReports = new ThreatReports(urls)

  it('should have no threats anywhere', () => {
    expect(threatReports.toBlocks).toEqual(expect.objectContaining({ 'nasa.gov': { threatMatch: 'NONE_FOUND' } }))
  })

  it('should have threats in cache and a lookup error', () => {
    threatReports.threatCacheReport = threatReportData.urlsInCache
    threatReports.lookupAPIReport.message = true
    expect(threatReports.toBlocks).toEqual(expect
      .objectContaining(
        threatReportData.urlsInCache,
        {
          'nasa.gov': { threatMatch: 'SAFE_BROWSE_ERROR' }
        }))
  })

  it('should have uls in cache, lookup api, and with no threats found', () => {
    threatReports.threatCacheReport = threatReportData.urlsInCache
    threatReports.lookupAPIReport = threatReportData.lookupAPIReport
    expect(threatReports.toBlocks).toEqual(expect
      .objectContaining(
        threatReportData.urlsInCache,
        threatReportData.lookupAPIReport.matches,
        {
          'nasa.gov': { threatMatch: 'NONE_FOUND' }
        })
    )
  })

  it.skip('should create deep copies of notInCache and toBlocksReport', () => {
    threatReports.threatCacheReport = threatReportData.urlsInCache
    threatReports.lookupAPIReport = threatReportData.lookupAPIReport
    threatReports.toBlocks
    expect(threatReports.notInCache).toEqual

  })
})
