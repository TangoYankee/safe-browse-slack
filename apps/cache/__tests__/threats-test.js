const {
  setCacheThreatTypes, setUrlDomainKeys, postCacheThreats,
  setCacheThreats, setCacheDuration, getCacheThreats,
  clearCache
} = require('../threats')

const { links, linksRepeat, linksNone } = require('../test-data/links-data')
const { threatsInCache, threatsInCacheNone, threatsInCacheRepeat } = require('../test-data/threats-in-cache-data')
const { threatsForCache, threatsForCacheRepeat, threatsForCacheNone } = require('../test-data/threats-for-cache-data')
const { inputMessage, inputMessageRepeat } = require('../test-data/input-messages-data')
const { outputMessage, outputMessageNone, outputMessageRepeat } = require('../test-data/output-messages-data')
const { linkThreats, linkThreatsRepeat, linkThreatsNone } = require('../test-data/link-threats-data')
const { urlDomainKeys, urlDomainKeysRepeat, urlDomainKeysNone } = require('../test-data/url-domain-keys-data')
const { cacheDurationUnits, cacheDurationBare } = require('../test-data/cache-duration-data')

describe.each([
 [linkThreatsNone, links, threatsInCacheNone, inputMessage, outputMessageNone],
 [linkThreats, links, threatsInCache, inputMessage, outputMessage],
 [linkThreatsRepeat, linksRepeat, threatsInCacheRepeat, inputMessageRepeat, outputMessageRepeat]
])('postCacheThreats(), getCacheThreats(), setCacheThreatTypes() cycle',
  (linkThreats, links, threatsInCache, inputMessage, outputMessage) => {

    afterAll(() => {
      clearCache()
    })

    test(
      'postCacheThreats() /* remember threats */',
      () => {
        expect(postCacheThreats(linkThreats)).toBe(true)
      }
    )

    test(
      'getCacheThreats() /* previously encountered threats */',
      () => {
        expect(getCacheThreats(links)).toEqual(threatsInCache)
      }
    )

    test(
      'setCacheThreatTypes() /* save threat matches to message object */',
      () => {
        expect(setCacheThreatTypes(inputMessage, threatsInCache)).toEqual(outputMessage)
      }
    )
  }
)

test.each([
  [links, urlDomainKeys],
  [linksRepeat, urlDomainKeysRepeat],
  [linksNone, urlDomainKeysNone]
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
  [linkThreatsRepeat, threatsForCacheRepeat],
  [linkThreatsNone, threatsForCacheNone]
])(
  'setCacheThreats() /* cache-friendly threat format */',
  (linkThreats, threatsForCache) => {
    expect(setCacheThreats(linkThreats)).toEqual(threatsForCache)
  }
)
