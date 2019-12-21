const {
  setCacheThreatTypes, setUrlDomainKeys, postCacheThreats,
  setCacheThreats, setCacheDuration, getCacheThreats
} = require('../threats')

const { links } = require('../test-data/links-data')
const { threatsInCache, threatsInCacheNone } = require('../test-data/threats-in-cache-data')
const { threatsForCache } = require('../test-data/threats-for-cache-data')
const { inputMessage } = require('../test-data/input-messages-data')
const { outputMessage, outputMessageNone } = require('../test-data/output-messages-data')
const { linkThreats } = require('../test-data/link-threats-data')
const { urlDomainKeys } = require('../test-data/url-domain-keys-data')
const { cacheDurationUnits, cacheDurationBare } = require('../test-data/cache-duration-data')

/* threats are not yet stored in cache */
test(
  'getCacheThreats() /* previously encountered threats */',
  () => {
    return expect(getCacheThreats(links)).toEqual(threatsInCacheNone)
  }
)

/* threats are not yet stored in cache */
test(
  'setCacheThreatTypes() /* save threat matches to message object */',
  () => {
    expect(setCacheThreatTypes(inputMessage, threatsInCacheNone)).toEqual(outputMessageNone)
  }
)

test(
  'postCacheThreats() /* remember threats */',
  () => {
    expect(postCacheThreats(linkThreats)).toBe(true)
  }
)

/* threats are now stored in cache */
test(
  'setCacheThreatTypes() /* save threat matches to message object */',
  () => {
    expect(setCacheThreatTypes(inputMessage, threatsInCache)).toEqual(outputMessage)
  }
)

/* threats are now stored cache */
test(
  'getCacheThreats() /* previously encountered threats */',
  () => {
    expect(getCacheThreats(links)).toEqual(threatsInCache)
  }
)

test(
  'setUrlDomainKeys() /* list of urls to look for in cache */',
  () => {
    expect(setUrlDomainKeys(links)).toEqual(urlDomainKeys)
  })

test(
  'setCacheDuration() /* string with units to integar */',
  () => {
    expect(setCacheDuration(cacheDurationUnits)).toEqual(cacheDurationBare)
  }
)

test(
  'setCacheThreats() /* cache-friendly threat format */',
  () => {
    expect(setCacheThreats(linkThreats)).toEqual(threatsForCache)
  }
)
