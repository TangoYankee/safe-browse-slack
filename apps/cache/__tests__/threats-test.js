const {
  setCacheThreatTypes, setUrlDomainKeys, postCacheThreats,
  setCacheThreats, setCacheDuration, getCacheThreats
} = require('../threats')

const { links, linksRepeat } = require('../test-data/links-data')
const { threatsInCache, threatsInCacheNone, threatsInCacheRepeat } = require('../test-data/threats-in-cache-data')
const { threatsForCache, threatsForCacheRepeat } = require('../test-data/threats-for-cache-data')
const { inputMessage, inputMessageRepeat } = require('../test-data/input-messages-data')
const { outputMessage, outputMessageNone, outputMessageRepeat } = require('../test-data/output-messages-data')
const { linkThreats, linkThreatsRepeat } = require('../test-data/link-threats-data')
const { urlDomainKeys, urlDomainKeysRepeat } = require('../test-data/url-domain-keys-data')
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

test.each([
  [linkThreats],
  [linkThreatsRepeat]
])(
  'postCacheThreats() /* remember threats */',
  (linkThreats) => {
    expect(postCacheThreats(linkThreats)).toBe(true)
  }
)

/* threats are now stored in cache */
test.each([
[inputMessage, threatsInCache, outputMessage],
[inputMessageRepeat, threatsInCacheRepeat, outputMessageRepeat]
])(
  'setCacheThreatTypes() /* save threat matches to message object */',
  (inputMessage, threatsInCache, outputMessage) => {
    expect(setCacheThreatTypes(inputMessage, threatsInCache)).toEqual(outputMessage)
  }
)

/* threats are now stored cache */
test.each([
  [links, threatsInCache],
  [linksRepeat, threatsInCacheRepeat]
])(
  'getCacheThreats() /* previously encountered threats */',
  (links, threatsInCache) => {
    expect(getCacheThreats(links)).toEqual(threatsInCache)
  }
)

test.each([
  [links, urlDomainKeys],
  [linksRepeat, urlDomainKeysRepeat ]
])(
  'setUrlDomainKeys() /* list of urls to look for in cache */',
  (links, urlDomainKeys) => {
    expect(setUrlDomainKeys(links)).toEqual(urlDomainKeys)
  })

test(
  'setCacheDuration() /* string with units to integar */',
  () => {
    expect(setCacheDuration(cacheDurationUnits)).toEqual(cacheDurationBare)
  }
)

test.each([
  [linkThreats, threatsForCache],
  [linkThreatsRepeat, threatsForCacheRepeat]
])(
  'setCacheThreats() /* cache-friendly threat format */',
  (linkThreats, threatsForCache) => {
    expect(setCacheThreats(linkThreats)).toEqual(threatsForCache)
  }
)
