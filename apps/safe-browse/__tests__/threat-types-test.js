'use strict'

const { setSafeBrowseThreatTypes } = require('../threat-types')

const {
  inputMessageOne, inputMessageTwo, inputMessageThree,
  inputMessageFour
} = require('../test-data/input-message-data')
const {
  outputMessageOne, outputMessageTwo,
  outputMessageThree, outputMessageFour
} = require('../test-data/output-message-data')

const {
  threatMatchOne, threatMatchTwo, threatMatchThree,
  threatMatchFour
} = require('../test-data/threat-matches-data')

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

