jest.mock('../post-threat-matches')
const { postThreatMatches } = require('../post-threat-matches')
const { setRequestBody, setUncachedThreatEntries, setThreatTypes } = require('../safe-browse')
const { inputMessageOne, inputMessageTwo, inputMessageThree } = require('../test-data/input-message-data')
const { outputMessageOne, outputMessageTwo, outputMessageThree } = require('../test-data/output-message-data')
const { requestBodyOne, requestBodyTwo, requestBodyThree } = require('../test-data/request-body-data')
const { threatEntryOne, threatEntryTwo, threatEntryThree } = require('../test-data/threat-entries-data')
const { threatMatchOne, threatMatchTwo, threatMatchThree } = require('../test-data/threat-matches-data')

test.each([
  [inputMessageOne, threatEntryOne],
  [inputMessageTwo, threatEntryTwo],
  [inputMessageThree, threatEntryThree]
])(
  'setUncachedThreatEntries() /* urls have a specific format when placed into Lookup API body */',
  (inputMessage, threatEntry) => {
    expect(setUncachedThreatEntries(inputMessage.links)).toEqual(threatEntry)
  })

test.each([
  [threatEntryOne, requestBodyOne],
  [threatEntryTwo, requestBodyTwo],
  [threatEntryThree, requestBodyThree]
])(
  'setRequestBody() /* place urls with uncached threats into a json template for the Safe Browse API */',
  (threatEntry, requestBody) => {
    expect(setRequestBody(threatEntry)).toEqual(requestBody)
  })

test.each([
  [inputMessageOne, threatMatchOne, outputMessageOne],
  [inputMessageTwo, threatMatchTwo, outputMessageTwo],
  [inputMessageThree, threatMatchThree, outputMessageThree]
])(
  'setThreatTypes() /* add threat type to the original message */',
  (inputMessage, threatMatch, outputMessage) => {
    expect(setThreatTypes(inputMessage, threatMatch)).toEqual(outputMessage)
  })

it(
  'postThreatMatches() /* threats suspected by google safe-browse API */',
  async () => {
    expect.assertions(1)
    const threatMatchesResponse = await postThreatMatches(requestBodyOne)
    return expect(threatMatchesResponse).toEqual(threatMatchOne)
  })
