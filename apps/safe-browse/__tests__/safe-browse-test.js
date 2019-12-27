const { postThreatMatches } = require('../post-threat-matches')
jest.mock('../post-threat-matches')

const {
  setSafeBrowseThreats, setRequestBody, setUncachedThreatEntries,
  setUncachedThreatEntriesExist, setSafeBrowseThreatTypes
} = require('../safe-browse')

const {
  inputMessageOne, inputMessageTwo, inputMessageThree,
  inputMessageFour, inputMessageSix
} = require('../test-data/input-message-data')
const {
  outputMessageOne, outputMessageTwo,
  outputMessageThree, outputMessageFour
} = require('../test-data/output-message-data')
const {
  requestBodyOne, requestBodyTwo, requestBodyThree,
  requestBodyFour, requestBodyFive
} = require('../test-data/request-body-data')
const {
  threatEntryOne, threatEntryExistOne, threatEntryTwo,
  threatEntryExistTwo, threatEntryThree, threatEntryExistThree,
  threatEntryFour, threatEntryExistFour, threatEntryFive,
  threatEntryExistFive
} = require('../test-data/threat-entries-data')
const {
  threatMatchOne, threatMatchTwo, threatMatchThree,
  threatMatchFour, threatMatchFive, threatMatchSix
} = require('../test-data/threat-matches-data')

describe.each([
  [inputMessageOne, threatMatchOne],
  [inputMessageTwo, threatMatchTwo],
  [inputMessageThree, threatMatchThree],
  [inputMessageFour, threatMatchFour],
  [inputMessageSix, threatMatchSix]
])('setSafeBrowseThreats() /* find suspected threats in safe browse API */',
  (inputMessage, threatMatch) => {
    test(
      'setSafeBrowseThreats()',
      async () => {
        expect.assertions(1)
        var threatMatchesResponse = await setSafeBrowseThreats(inputMessage.links)
        return expect(threatMatchesResponse).toEqual(threatMatch)
      })
  }
)

test.each([
  [inputMessageOne, threatEntryOne],
  [inputMessageTwo, threatEntryTwo],
  [inputMessageThree, threatEntryThree],
  [inputMessageFour, threatEntryFour]
  // [inputMessageFive, threatEntryFive]
])(
  'setUncachedThreatEntries() /* urls have a specific format when placed into Lookup API body */',
  (inputMessage, threatEntry) => {
    expect(setUncachedThreatEntries(inputMessage.links)).toEqual(threatEntry)
  })

test.each([
  [threatEntryOne, threatEntryExistOne],
  [threatEntryTwo, threatEntryExistTwo],
  [threatEntryThree, threatEntryExistThree],
  [threatEntryFour, threatEntryExistFour],
  [threatEntryExistFive, threatEntryExistFive]
])(
  'setUncachedThreatEntriesExist() /* prevent unnecessary calls to the SafeBrowse API, where there are no uncached threat urls */',
  (threatEntry, threatEntryExists) => {
    expect(setUncachedThreatEntriesExist(threatEntry)).toEqual(threatEntryExists)
  }
)

test.each([
  [threatEntryOne, requestBodyOne],
  [threatEntryTwo, requestBodyTwo],
  [threatEntryThree, requestBodyThree],
  [threatEntryFour, requestBodyFour]
])(
  'setRequestBody() /* place urls with uncached threats into a json template for the Safe Browse API */',
  (threatEntry, requestBody) => {
    expect(setRequestBody(threatEntry)).toEqual(requestBody)
  })

test.each([
  [inputMessageOne, threatMatchOne, outputMessageOne],
  [inputMessageTwo, threatMatchTwo, outputMessageTwo],
  [inputMessageThree, threatMatchThree, outputMessageThree],
  [inputMessageFour, threatMatchFour, outputMessageFour]
])(
  'setSafeBrowseThreatTypes() /* add threat type to the original message */',
  (inputMessage, threatMatch, outputMessage) => {
    expect(setSafeBrowseThreatTypes(inputMessage, threatMatch)).toEqual(outputMessage)
  })

describe.each([
  [requestBodyOne, threatMatchOne],
  [requestBodyTwo, threatMatchTwo],
  [requestBodyThree, threatMatchThree],
  [requestBodyFour, threatMatchFour],
  [requestBodyFive, threatMatchFive]
])('postThreatMatches() /* threats suspected by google safe-browse API */',
  (requestBody, threatMatch) => {
    test(
      'postThreatMatches()',
      async () => {
        expect.assertions(1)
        const threatMatchesResponse = await postThreatMatches(requestBody)
        return expect(threatMatchesResponse).toEqual(threatMatch)
      })
  })
