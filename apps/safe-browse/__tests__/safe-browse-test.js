jest.mock('../post-threat-matches')
const { postThreatMatches } = require('../post-threat-matches')
const { setRequestBody, setUncachedThreatEntries, setThreatTypes } = require('../safe-browse')
const {
  threatEntries, requestBody,
  inputMessageData, outputMessageData
} = require('../test-data/safe-browse-data')
const { threatMatches } = require('../test-data/post-threat-matches-data')

test(
  'setUncachedThreatEntries() /* urls have a specific format when placed into Lookup API body */',
  () => {
    expect(setUncachedThreatEntries(inputMessageData.links)).toEqual(threatEntries)
  })

test(
  'setRequestBody() /* place urls with uncached threats into a json template for the Safe Browse API */',
  () => {
    expect(setRequestBody(threatEntries)).toEqual(requestBody)
  })

test(
  'setThreatTypes() /* add threat type to the original message */',
  () => {
    expect(setThreatTypes(inputMessageData, threatMatches)).toEqual(outputMessageData)
  })

it(
  'postThreatMatches() /* threats suspected by google safe-browse API */',
  async () => {
    expect.assertions(1)
    const threatMatchesResponse = await postThreatMatches(requestBody)
    return expect(threatMatchesResponse).toEqual(threatMatches)
  })
