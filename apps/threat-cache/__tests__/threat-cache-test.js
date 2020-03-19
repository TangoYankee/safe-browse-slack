'use strict'

const ThreatCache = require('../threat-cache')
const ThreatCacheData = require('../test-data/threat-cache-data')

describe('manage the threat cache', () => {
  var threatCache = new ThreatCache()
  var threatCacheData = new ThreatCacheData()

  afterAll(() => {
    threatCache.terminate()
  })

  it('should parse time into an integer', () => {
    expect(threatCache._duration('300s')).toEqual(300)
  })

  it('should make url objects cache friendly', () => {
    expect(threatCache._metaDataStore(threatCacheData.forCacheStore)).toEqual(threatCacheData.cacheFriendly)
  })

  it('should save the threat report to the cache', () => {
    expect(threatCache.store(threatCacheData.forCacheStore)).toBe(true)
  })

  it('should recieve a threat report of urls already in the cache', () => {
    expect(threatCache.report(threatCacheData.urls)).toEqual(threatCacheData.urlsInCache)
  })

  it('should flush the cache of all data', () => {
    expect(threatCache.clearData).toEqual(expect.objectContaining({ keys: 0 }))
  })
})
