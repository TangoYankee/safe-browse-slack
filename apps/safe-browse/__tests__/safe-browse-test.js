const { postThreatMatches } = require('../post-threat-matches')
jest.mock('../post-threat-matches')

const {
  setSafeBrowseThreats, setRequestBody, setUncachedThreatEntries,
  setUncachedThreatEntriesExist, setSafeBrowseThreatTypes
} = require('../safe-browse')

const {
  inputMessageOne, inputMessageTwo, inputMessageThree,
  inputMessageFour, inputMessageFive
} = require('../test-data/input-message-data')
const {
  outputMessageOne, outputMessageTwo,
  outputMessageThree, outputMessageFour
} = require('../test-data/output-message-data')
const {
  requestBodyOne, requestBodyTwo,
  requestBodyThree, requestBodyFour
} = require('../test-data/request-body-data')
const {
  threatEntryOne, threatEntryExistOne, threatEntryTwo,
  threatEntryExistTwo, threatEntryThree, threatEntryExistThree,
  threatEntryFour, threatEntryExistFour, threatEntryFive,
  threatEntryExistFive
} = require('../test-data/threat-entries-data')
const {
  threatMatchOne, threatMatchTwo,
  threatMatchThree, threatMatchFour
} = require('../test-data/threat-matches-data')

test(
  'setSafeBrowseThreats() /* find suspected threats in safe browse API */',
  async () => {
    expect.assertions(1)
    var threatMatchesResponse = await setSafeBrowseThreats(inputMessageOne.links)
    return expect(threatMatchesResponse).toEqual(threatMatchOne)
  }
)

test.each([
  [inputMessageOne, threatEntryOne],
  [inputMessageTwo, threatEntryTwo],
  [inputMessageThree, threatEntryThree],
  [inputMessageFour, threatEntryFour],
  [inputMessageFive, threatEntryFive]
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

it(
  'postThreatMatches() /* threats suspected by google safe-browse API */',
  async () => {
    expect.assertions(1)
    const threatMatchesResponse = await postThreatMatches(0)
    return expect(threatMatchesResponse).toEqual(threatMatchOne)
  })
