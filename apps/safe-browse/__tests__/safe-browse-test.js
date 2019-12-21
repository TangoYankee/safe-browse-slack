jest.mock('../post-threat-matches')
const { postThreatMatches } = require('../post-threat-matches')
const { setSafeBrowseThreats, setRequestBody, setUncachedThreatEntries, setSafeBrowseThreatTypes } = require('../safe-browse')
const {
  inputMessageOne, inputMessageTwo,
  inputMessageThree, inputMessageFour
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
  threatEntryOne, threatEntryTwo,
  threatEntryThree, threatEntryFour
} = require('../test-data/threat-entries-data')
const {
  threatMatchOne, threatMatchTwo,
  threatMatchThree, threatMatchFour
} = require('../test-data/threat-matches-data')

test.each(
  [inputMessageOne, threatMatchOne]
)(
  'setSafeBrowseThreats() /* find suspected threats in safe browse API */',
  (inputMessage, threatMatch) => {
    expect(setSafeBrowseThreats(inputMessage.links)).toEqual(threatMatch)
  })

test.each([
  [inputMessageOne, threatEntryOne],
  [inputMessageTwo, threatEntryTwo],
  [inputMessageThree, threatEntryThree],
  [inputMessageFour, threatEntryFour]
])(
  'setUncachedThreatEntries() /* urls have a specific format when placed into Lookup API body */',
  (inputMessage, threatEntry) => {
    expect(setUncachedThreatEntries(inputMessage.links)).toEqual(threatEntry)
  })

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
    const threatMatchesResponse = await postThreatMatches(requestBodyOne)
    return expect(threatMatchesResponse).toEqual(threatMatchOne)
  })
