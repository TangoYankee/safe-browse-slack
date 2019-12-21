jest.mock('../../safe-browse/post-threat-matches')
const { postThreatMatches } = require('../../safe-browse/__mocks__/post-threat-matches')
const { hyperText, setMessage } = require('../hyper-text')
const { messages } = require('../test-data/hyper-text-data')
const { inputTextOne } = require('../test-data/set-message-data/input-text-data')
const { outputMessageOne } = require('../test-data/set-message-data/output-message-data')
const { userIdOne } = require('../test-data/set-message-data/user-id-data')
const { requestBodyOne } = require('../../safe-browse/test-data/request-body-data')
const { threatMatchOne } = require('../../safe-browse/test-data/threat-matches-data')
test.each(messages)(
  'hyperText() /* receive markdown hypertext syntax, return slack hypertext syntax */',
  (inputMessage, expectedMessage) => {
    expect(hyperText(inputMessage)).toEqual(expectedMessage)
  })

/* Need to test setMessage Module */
// test.each([
//   [inputTextOne, userIdOne, outputMessageOne]
// ])(
//   'setMessage() /* receive markdown hypertext syntax, return slack hypertext syntax and threat data */',
//   (inputText, userId, outputMessage) => {
//     expect(setMessage(inputText, userId)).toEqual(outputMessage)
//   }
// )

it(
  'setMessage() /* receive markdown hypertext syntax, return slack hypertext syntax and threat data */',
  async () => {
    expect.assertions(1)
    const threatMatchesResponse = await postThreatMatches(requestBodyOne)
    return expect(threatMatchesResponse).toEqual(threatMatchOne)
  })
