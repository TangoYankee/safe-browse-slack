const {
  setCacheThreatTypes, setUrlDomainKeys, postCacheThreats,
  setCacheThreats, setCacheDuration,
  getCacheThreats
} = require('../threats')
const {
  hyperTexts, urlDomainKeys,
  hyperTextThreats, cacheThreats,
  cacheDurationUnits, cacheDuration,
  cacheThreatsResponse, inputMessageData,
  messageThreatData
} = require('../test-data/threats-data')

test(
  'setCacheThreatTypes() /* save threat matches to message object */',
  () => {
    expect(setCacheThreatTypes(inputMessageData, cacheThreatsResponse)).toEqual(messageThreatData)
  }
)

test(
  'postCacheThreats() /* remember threats */',
  () => {
    expect(postCacheThreats(hyperTextThreats)).toBe(true)
  }
)

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
