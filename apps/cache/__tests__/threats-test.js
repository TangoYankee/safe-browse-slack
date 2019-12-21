const {
  setCacheThreatTypes, setUrlDomainKeys, postCacheThreats,
  setCacheThreats, setCacheDuration, getCacheThreats
} = require('../threats')
const {
  hyperTexts, urlDomainKeys, hyperTextThreats,
  cacheThreats, cacheDurationUnits, cacheDuration,
  cacheThreatsResponse, inputMessageData, messageThreatData,
  cacheThreatsResponseUnstored, messageThreatDataUnstored
} = require('../test-data/threats-data')

/* threats are not yet stored in cache */
test(
  'getCacheThreats() /* previously encountered threats */',
  () => {
    return expect(getCacheThreats(hyperTexts)).toEqual(cacheThreatsResponseUnstored)
  }
)

/* threats are not yet stored in cache */
test(
  'setCacheThreatTypes() /* save threat matches to message object */',
  () => {
    expect(setCacheThreatTypes(inputMessageData, cacheThreatsResponseUnstored)).toEqual(messageThreatDataUnstored)
  }
)

test(
  'postCacheThreats() /* remember threats */',
  () => {
    expect(postCacheThreats(hyperTextThreats)).toBe(true)
  }
)

/* threats are now stored in cache */
test(
  'setCacheThreatTypes() /* save threat matches to message object */',
  () => {
    expect(setCacheThreatTypes(inputMessageData, cacheThreatsResponse)).toEqual(messageThreatData)
  }
)

/* threats are now stored cache */
test(
  'getCacheThreats() /* previously encountered threats */',
  () => {
    return expect(getCacheThreats(hyperTexts)).toEqual(cacheThreatsResponse)
  }
)

test(
  'setUrlDomainKeys() /* list of urls to look for in cache */',
  () => {
    expect(setUrlDomainKeys(hyperTexts)).toEqual(urlDomainKeys)
  })

test(
  'setCacheDuration() /* string with units to integar */',
  () => {
    expect(setCacheDuration(cacheDurationUnits)).toEqual(cacheDuration)
  }
)

test(
  'setCacheThreats() /* cache-friendly threat format */',
  () => {
    expect(setCacheThreats(hyperTextThreats)).toEqual(cacheThreats)
  }
)
