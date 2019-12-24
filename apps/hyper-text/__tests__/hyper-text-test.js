jest.mock('../../safe-browse/post-threat-matches')
const {
  setMessage, setHyperText,
  getCache, setSafeBrowse
} = require('../hyper-text')
const { inputTextOne } = require('../test-data/set-message-data/input-text-data')
const { outputMessageOne } = require('../test-data/set-message-data/output-message-data')
const { userIdOne } = require('../test-data/set-message-data/user-id-data')


// Insert into a 'describe' block
// Within 'describe' also include the 'getCache' function to test the 'postCache' functionality
// Start block with 'before all' to seed the cache with data
// End block with 'after all' to clear the cache of data 
test(
  'setMessage() /* receive markdown hypertext syntax, return slack hypertext syntax and threat data */',
  async () => {
    expect.assertions(1)
    const message = await setMessage(inputTextOne, userIdOne)
    return expect(message).toEqual(outputMessageOne)
  })

test.each([

])(
  'setHyperText() /* destination urls, display text, and their meta data */',
  (messageData, allHyperTextPositions, text, hyperTextMessage) => {
    expect(setHyperText(messageData, allHyperTextPositions, text)).toEqual(hyperTextMessage)
  }
)

test.each([


// Place into 'describe' block
// Start with 'beforeAll' to seed cache data
// End with 'afterAll' to clear cache  
])(
  'getCache() /* reference threat urls that are already saved locally */',
  (messageDataIntoCache, messageDataOutOfCache) => {
    expect(getCache(messageDataIntoCache)).toEqual(messageDataOutOfCache)
  }
)

test.each([

// Import mock 'postThreatMatches'  
])(
  'setSafeBrowse() * check whether url is a suspected threat by google safe browse api */',
  (messageDataIntoSafeBrowse, messageDataOutOfSafeBrowse) => {
    expect(setSafeBrowse(messageDataIntoSafeBrowse)).toEqual(messageDataOutOfSafeBrowse)
  }
)
