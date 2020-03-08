'use strict'

// jest.mock('../../safe-browse/post-threat-matches')
const requestPromise = require('request-promise')
const { mockSafeBrowseResponse, mockFailedSafeBrowseResponse } = require('../../safe-browse/class-test-data/response-data')

// Test Modules
const {
  setMessage, setHyperText, getCache,
  setSafeBrowse, setNoneFound
} = require('../set-message')
const { postCacheThreats, clearCache } = require('../../cache/threats')
// Test Data
// Set Message
const {
  setMessagePostToCacheOne, setMessagePostToCacheTwo, setMessagePostToCacheThree,
  setMessagePostToCacheFour, setMessagePostToCacheFive
} = require('../test-data/set-message-data/set-message-post-to-cache-data')
const {
  inputTextOne, inputTextTwo, inputTextThree,
  inputTextFour, inputTextFive
} = require('../test-data/set-message-data/input-text-data')
const {
  outputMessageOne, outputMessageTwo, outputMessageThree,
  outputMessageFour, outputMessageFive
} = require('../test-data/set-message-data/output-message-data')
const {
  userIdOne, userIdTwo, userIdThree,
  userIdFour, userIdFive
} = require('../test-data/set-message-data/user-id-data')
// HyperText
const { messageDataIntoHyperTextOne } = require('../test-data/hyper-text-data/into-hyper-text-data')
const { textOne } = require('../test-data/hyper-text-data/text-data')
const { messageDataOutOfHyperTextOne } = require('../test-data/hyper-text-data/out-of-hyper-text-data')
// getCache
const { postToCacheOne, postToCacheTwo, postToCacheThree } = require('../test-data/get-cache-data/post-to-cache-data')
const { messageDataIntoCacheOne, messageDataIntoCacheTwo, messageDataIntoCacheThree } = require('../test-data/get-cache-data/into-cache-data')
const { messageDataOutOfCacheOne, messageDataOutOfCacheTwo, messageDataOutOfCacheThree } = require('../test-data/get-cache-data/out-of-cache-data')
// setNoneFound
const { messageDataIntoNoneFoundOne } = require('../test-data/set-none-found-data/into-none-found-data')
const { messageDataOutOfNoneFoundOne } = require('../test-data/set-none-found-data/out-of-none-found-data')

describe.each([
  [setMessagePostToCacheOne, inputTextOne, userIdOne, outputMessageOne, [
    'SOCIAL_ENGINEERING',
    'UNWANTED_SOFTWARE',
    'MALWARE',
    'NONE_FOUND'
  ]],
  [setMessagePostToCacheTwo, inputTextTwo, userIdTwo, outputMessageTwo, [
    'UNWANTED_SOFTWARE',
    'MALWARE',
    'NONE_FOUND'
  ]],
  [setMessagePostToCacheThree, inputTextThree, userIdThree, outputMessageThree, ['NONE_FOUND']],
  [setMessagePostToCacheFive, inputTextFive, userIdFive, outputMessageFive, []]
])(
  'setMessage() suite /* receive markdown hypertext syntax, return slack hypertext syntax and threat data */',
  (setMessagePostToCache, inputText, userId, outputMessage, threats) => {

    beforeEach(() => {
      requestPromise.post.mockResolvedValue(mockSafeBrowseResponse(threats))
      postCacheThreats(setMessagePostToCache)
    })
    afterEach(() => {
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

describe('safebrowse denies access', () => {
  var setMessagePostToCache = setMessagePostToCacheFour
  var inputText = inputTextFour
  var userId = userIdFour
  var outputMessage = outputMessageFour
  var spyOnWarn

  beforeAll(() => {
    spyOnWarn = jest.spyOn(console, 'warn').mockImplementation()
    requestPromise.post.mockResolvedValue(mockFailedSafeBrowseResponse)
    postCacheThreats(setMessagePostToCache)
  })
  afterEach(() => {
    clearCache()
    spyOnWarn.mockRestore()
  })
  it('should reflect a failed safebrowse call', async () => {
      expect.assertions(1)
      var message = await setMessage(inputText, userId)
      expect(message).toEqual(outputMessage)
    }
  )
})

test.each([
  [messageDataIntoHyperTextOne, textOne, messageDataOutOfHyperTextOne]
])(
  'setHyperText() /* destination urls, display text, and their meta data */',
  (messageDataIntoHyperText, text, messageDataOutOfHyperText) => {
    expect(setHyperText(messageDataIntoHyperText, text)).toEqual(messageDataOutOfHyperText)
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
  [messageDataIntoNoneFoundOne, messageDataOutOfNoneFoundOne]
])(
  'setNoneFound () /* identify if there are links that are not suspected of threats*/',
  (messageDataIntoNoneFound, messageDataOutOfNoneFound) => {
    expect(setNoneFound(messageDataIntoNoneFound)).toEqual(messageDataOutOfNoneFound)
  }
)
