jest.mock('../../safe-browse/post-threat-matches')
const { hyperText, setMessage } = require('../hyper-text')
const { messages } = require('../test-data/hyper-text-data')
const { inputTextOne } = require('../test-data/set-message-data/input-text-data')
const { outputMessageOne } = require('../test-data/set-message-data/output-message-data')
const { userIdOne } = require('../test-data/set-message-data/user-id-data')

// test.each(messages)(
//   'hyperText() /* receive markdown hypertext syntax, return slack hypertext syntax */',
//   (inputMessage, expectedMessage) => {
//     expect(hyperText(inputMessage)).toEqual(expectedMessage)
//   })

test(
  'setMessage() /* receive markdown hypertext syntax, return slack hypertext syntax and threat data */',
  async () => {
    expect.assertions(1)
    const message = await setMessage(inputTextOne, userIdOne)
    return expect(message).toEqual(outputMessageOne)
  })
