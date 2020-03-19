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

  it('should return threat matches reported by lookup API', ()=>{
    threatReports.lookupAPIReport = threatReportData.lookupAPIReport
    expect(threatReports.toCache).toEqual(threatReportData.lookupAPIReport.matches)
  })
})

describe('consolidates reports to send to block builder', () => {
  it.skip('should have no threats anywhere', () => {

  })

  it.skip('should have threats in cache and a lookup error', () => {

  })

  it.skip('should have uls in cache, lookup api, and with no threats found', ()=> {

  })

  it.skip('should create deep copies of notInCache and toBlocksReport', () => {
    
  })
})
