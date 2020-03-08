'use strict'

const requestPromise = require('request-promise')
const { mockSafeBrowseResponse } = require('../../safe-browse/class-test-data/response-data')
// Test Modules
const {
  setMessage, setHyperText, getCache,
  setSafeBrowse, setNoneFound
} = require('../set-message')
const { postCacheThreats, clearCache } = require('../../cache/threats')
// Test Data
// Set Message
const {
  setMessagePostToCacheOne } = require('../test-data/set-message-data/set-message-post-to-cache-data')
const {
  inputTextOne } = require('../test-data/set-message-data/input-text-data')
const { outputMessageOne } = require('../test-data/set-message-data/output-message-data')
const { userIdOne } = require('../test-data/set-message-data/user-id-data')
// HyperText
const { messageDataIntoHyperTextOne } = require('../test-data/hyper-text-data/into-hyper-text-data')
const { textOne } = require('../test-data/hyper-text-data/text-data')
const { messageDataOutOfHyperTextOne } = require('../test-data/hyper-text-data/out-of-hyper-text-data')
// getCache
const { postToCacheOne } = require('../test-data/get-cache-data/post-to-cache-data')
const { messageDataIntoCacheOne } = require('../test-data/get-cache-data/into-cache-data')
const { messageDataOutOfCacheOne } = require('../test-data/get-cache-data/out-of-cache-data')
// setSafeBrowse
const { messageDataIntoSafeBrowseFull } = require('../test-data/set-safe-browse-data/into-safe-browse-data')
const { messageDataOutOfSafeBrowseFull } = require('../test-data/set-safe-browse-data/out-of-safe-browse-data')
// setNoneFound
const { messageDataIntoNoneFoundOne } = require('../test-data/set-none-found-data/into-none-found-data')
const { messageDataOutOfNoneFoundOne } = require('../test-data/set-none-found-data/out-of-none-found-data')

describe('setMessage() suite /* receive markdown hypertext syntax, return slack hypertext syntax and threat data */', () => {
  var threats = [
    'SOCIAL_ENGINEERING',
    'UNWANTED_SOFTWARE',
    'MALWARE',
    'NONE_FOUND'
  ]

  beforeAll(() => {
    requestPromise.post.mockResolvedValue(mockSafeBrowseResponse(threats))
    postCacheThreats(setMessagePostToCacheOne)
  })

  afterAll(() => {
    clearCache()
  })

  it('should correctly set a message', async () => {
    var message = await setMessage(inputTextOne, userIdOne)
    return expect(message).toEqual(outputMessageOne)
  })

})

// describe.each([
//   [setMessagePostToCacheOne, inputTextOne, userIdOne, outputMessageOne, [
//     'SOCIAL_ENGINEERING',
//     'UNWANTED_SOFTWARE',
//     'MALWARE',
//     'NONE_FOUND'
//   ]],
//   [setMessagePostToCacheTwo, inputTextTwo, userIdTwo, outputMessageTwo, [
//     'SOCIAL_ENGINEERING',
//     'UNWANTED_SOFTWARE',
//     'MALWARE',
//     'NONE_FOUND'
//   ]],
//   [setMessagePostToCacheThree, inputTextThree, userIdThree, outputMessageThree, ['NONE_FOUND']],
//   [setMessagePostToCacheFour, inputTextFour, userIdFour, outputMessageFour, [
//     'SOCIAL_ENGINEERING',
//     'UNWANTED_SOFTWARE',
//     'MALWARE',
//     'NONE_FOUND'
//   ]],
//   [setMessagePostToCacheFive, inputTextFive, userIdFive, outputMessageFive, []]
// ])(
//   'setMessage() suite /* receive markdown hypertext syntax, return slack hypertext syntax and threat data */',
//   (setMessagePostToCache, inputText, userId, outputMessage, threats) => {

//     // var urlDomainKeys = mockUrlDomainKeys(threats)
//     beforeAll(() => {
//       requestPromise.post.mockResolvedValue(mockSafeBrowseResponse(threats))
//       postCacheThreats(setMessagePostToCache)
//     })
//     afterAll(() => {
//       clearCache()
//     })
//     test(
//       'setMessage()',
//       async () => {
//         expect.assertions(1)
//         var message = await setMessage(inputText, userId)
//         expect(message).toEqual(outputMessage)
//       }
//     )
//   }
// )

// test.each([
//   [messageDataIntoHyperTextOne, textOne, messageDataOutOfHyperTextOne]
// ])(
//   'setHyperText() /* destination urls, display text, and their meta data */',
//   (messageDataIntoHyperText, text, messageDataOutOfHyperText) => {
//     expect(setHyperText(messageDataIntoHyperText, text)).toEqual(messageDataOutOfHyperText)
//   }
// )

// describe.each([
//   [postToCacheOne, messageDataIntoCacheOne, messageDataOutOfCacheOne],
//   [postToCacheTwo, messageDataIntoCacheTwo, messageDataOutOfCacheTwo],
//   [postToCacheThree, messageDataIntoCacheThree, messageDataOutOfCacheThree]
// ])(
//   'getCache() suite /* reference threat urls that are already saved locally */',
//   (postToCache, messageDataIntoCache, messageDataOutOfCache) => {
//     beforeAll(() => {
//       postCacheThreats(postToCache)
//     })
//     afterAll(() => {
//       clearCache()
//     })
//     test(
//       'getCache()',
//       () => {
//         expect(getCache(messageDataIntoCache)).toEqual(messageDataOutOfCache)
//       })
//   }
// )

// // Why is this test in set message?
// test.each([
//   [messageDataIntoSafeBrowseFull, messageDataOutOfSafeBrowseFull],
//   [messageDataIntoSafeBrowseEmpty, messageDataOutOfSafeBrowseEmpty],
//   [messageDataIntoSafeBrowseError, messageDataOutOfSafeBrowseError]
// ])(
//   'setSafeBrowse() /* check whether url is a suspected threat by google safe browse api */',
//   async (messageDataIntoSafeBrowse, messageDataOutOfSafeBrowse) => {
//     expect.assertions(1)
//     var messageDataOut = await setSafeBrowse(messageDataIntoSafeBrowse)
//     expect(messageDataOut).toEqual(messageDataOutOfSafeBrowse)
//   }
// )

describe('identify if there are links that are not suspected of threats', () => {
  it('should find links with no threats', () => {
    expect(setNoneFound(messageDataIntoNoneFoundOne)).toEqual(messageDataOutOfNoneFoundOne)
  })
})
