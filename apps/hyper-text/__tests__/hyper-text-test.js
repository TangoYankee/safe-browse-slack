jest.mock('../../safe-browse/post-threat-matches')
// Test Modules
const {
  setMessage, setHyperText,
  getCache, setSafeBrowse
} = require('../hyper-text')
const { postCacheThreats, clearCache } = require('../../cache/threats')
// Test Data
// Set Message
const { setMessagePostToCacheOne } = require('../test-data/set-message-data/set-message-post-to-cache-data')
const { inputTextOne } = require('../test-data/set-message-data/input-text-data')
const { outputMessageOne } = require('../test-data/set-message-data/output-message-data')
const { userIdOne } = require('../test-data/set-message-data/user-id-data')
// HyperText
const { messageDataIntoHyperTextOne } = require('../test-data/hyper-text-data/into-hyper-text-data')
const { allHyperTextPositionsOne } = require('../test-data/hyper-text-data/hyper-text-positions-data')
const { textOne } = require('../test-data/hyper-text-data/text-data')
const { messageDataOutOfHyperTextOne } = require('../test-data/hyper-text-data/out-of-hyper-text-data')
//getCache
const { postToCacheOne, postToCacheTwo, postToCacheThree } = require('../test-data/get-cache-data/post-to-cache-data')
const { messageDataIntoCacheOne, messageDataIntoCacheTwo, messageDataIntoCacheThree } = require('../test-data/get-cache-data/into-cache-data')
const { messageDataOutOfCacheOne, messageDataOutOfCacheTwo, messageDataOutOfCacheThree } = require('../test-data/get-cache-data/out-of-cache-data')
// setSafeBrowse
const { messageDataIntoSafeBrowseFull, messageDataIntoSafeBrowseEmpty } = require('../test-data/set-safe-browse-data/into-safe-browse-data')
const { messageDataOutOfSafeBrowseFull, messageDataOutOfSafeBrowseEmpty } = require('../test-data/set-safe-browse-data/out-of-safe-browse-data')

describe.each([
  [setMessagePostToCacheOne, inputTextOne, userIdOne, outputMessageOne]
])(
  'setMessage() suite /* receive markdown hypertext syntax, return slack hypertext syntax and threat data */',
  (setMessagePostToCache, inputText, userId, outputMessage) => {
    beforeAll(() => {
      postCacheThreats(setMessagePostToCache)
    })
    afterAll(() => {
      clearCache()
    })
    test(
      'setMessage()',
      async () => {
        expect.assertions(1)
        var message = await setMessage(inputText, userId)
        expect(message).toEqual(outputMessage)
      }
    )
  }
)

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

test.each([
  [messageDataIntoHyperTextOne, allHyperTextPositionsOne, textOne, messageDataOutOfHyperTextOne]
])(
  'setHyperText() /* destination urls, display text, and their meta data */',
  (messageDataIntoHyperText, allHyperTextPositions, text, messageDataOutOfHyperText) => {
    expect(setHyperText(messageDataIntoHyperText, allHyperTextPositions, text)).toEqual(messageDataOutOfHyperText)
  }
)

describe.each([
  [postToCacheOne, messageDataIntoCacheOne, messageDataOutOfCacheOne],
  [postToCacheTwo, messageDataIntoCacheTwo, messageDataOutOfCacheTwo],
  [postToCacheThree, messageDataIntoCacheThree, messageDataOutOfCacheThree]
])(
  'getCache() suite /* reference threat urls that are already saved locally */',
  (postToCache, messageDataIntoCache, messageDataOutOfCache) => {
    beforeAll(() => {
      postCacheThreats(postToCache)
    })
    afterAll(() => { 
      clearCache() 
    })
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
