jest.mock('../../safe-browse/post-threat-matches')
const { setMessage } = require('../hyper-text')
const { inputTextOne } = require('../test-data/set-message-data/input-text-data')
const { outputMessageOne } = require('../test-data/set-message-data/output-message-data')
const { userIdOne } = require('../test-data/set-message-data/user-id-data')

test(
  'setMessage() /* receive markdown hypertext syntax, return slack hypertext syntax and threat data */',
  async () => {
    expect.assertions(1)
    const message = await setMessage(inputTextOne, userIdOne)
    return expect(message).toEqual(outputMessageOne)
  })
