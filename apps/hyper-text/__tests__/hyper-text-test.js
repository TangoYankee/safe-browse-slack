jest.mock('../../safe-browse/post-threat-matches')
const {
  setMessage, setHyperText,
  getCache, setSafeBrowse
} = require('../hyper-text')
const { postCacheThreats, clearCache } = require('../../cache/threats')
const { inputTextOne } = require('../test-data/set-message-data/input-text-data')
const { outputMessageOne } = require('../test-data/set-message-data/output-message-data')
const { userIdOne } = require('../test-data/set-message-data/user-id-data')
const { inCacheBeforeOne } = require('../test-data/set-message-data/in-cache-before-data')
const { messageDataIntoCacheOne } = require('../test-data/set-message-data/into-cache-data')
const { messageDataOutOfCacheOne } = require('../test-data/set-message-data/out-of-cache-data')
const { messageDataIntoSafeBrowseFull, messageDataIntoSafeBrowseEmpty } = require('../test-data/set-message-data/into-safe-browse-data')
const { messageDataOutOfSafeBrowseFull, messageDataOutOfSafeBrowseEmpty } = require('../test-data/set-message-data/out-of-safe-browse-data')

// Insert into a 'describe' block
// Within 'describe' also include the 'getCache' function to test the 'postCache' functionality
// Start block with 'before all' to seed the cache with data
// End block with 'after all' to clear the cache of data
// test(
//   'setMessage() /* receive markdown hypertext syntax, return slack hypertext syntax and threat data */',
//   async () => {
//     expect.assertions(1)
//     const message = await setMessage(inputTextOne, userIdOne)
//     return expect(message).toEqual(outputMessageOne)
//   })

// test.each([

// ])(
//   'setHyperText() /* destination urls, display text, and their meta data */',
//   (messageData, allHyperTextPositions, text, hyperTextMessage) => {
//     expect(setHyperText(messageData, allHyperTextPositions, text)).toEqual(hyperTextMessage)
//   }
// )

describe.each([
  [inCacheBeforeOne, messageDataIntoCacheOne, messageDataOutOfCacheOne]
])(
  'getCache() suite /* reference threat urls that are already saved locally */',
  (inCacheBefore, messageDataIntoCache, messageDataOutOfCache) => {
    postCacheThreats(inCacheBefore)
    afterAll(() => { clearCache() })
    test(
      'getCache()',
      () => {
        expect(getCache(messageDataIntoCache)).toEqual(messageDataOutOfCache)
      })
  }
)

test.each([
  [messageDataIntoSafeBrowseFull, messageDataOutOfSafeBrowseFull],
  [messageDataIntoSafeBrowseEmpty, messageDataOutOfSafeBrowseEmpty]
])(
  'setSafeBrowse() /* check whether url is a suspected threat by google safe browse api */',
  async (messageDataIntoSafeBrowse, messageDataOutOfSafeBrowse) => {
    expect.assertions(1)
    var messageDataOut = await setSafeBrowse(messageDataIntoSafeBrowse)
    expect(messageDataOut).toEqual(messageDataOutOfSafeBrowse)
  }
)
