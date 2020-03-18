'use strict'

const ThreatCache = require('../threat-cache')
const ThreatReportData = require('../../__test-data__/threat-report-data')

describe('manage the threat cache', () => {
  var threatCache = new ThreatCache()
  var threatReportData = new ThreatReportData()

  afterAll(() => {
    threatCache.terminate()
  })
  // Move to Threat Report
  it('should parse time into an integer', () => {
    expect(threatCache._duration('300s')).toEqual(300)
  })

  it('should make url objects cache friendly', () => {
    expect(threatCache._metaDataStore(threatReportData.forCacheStore)).toEqual(threatReportData.cacheFriendly)
  })

  it('should save the threat report to the cache', () => {
    expect(threatCache.store(threatReportData.forCacheStore)).toBe(true)
  })

  it('should recieve a threat report of urls already in the cache', () => {
    expect(threatCache.report(threatReportData.userSubmittedUrls)).toEqual(threatReportData.urlsInCache)
  })

  it('should flush the cache of all data', () => {
    expect(threatCache.clearData).toEqual(expect.objectContaining({ keys: 0 }))
  })
})
