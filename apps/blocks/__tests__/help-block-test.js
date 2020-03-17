'use strict'

const HelpBlock = require('../help-block')
const { helpWelcomeData, helpInputData } = require('../test-data/help-test-data')

describe('it should be formatted to fit slack blocks', () => {
  it('should explain how to use the application', () => {
    var help = new HelpBlock('tangoyankee', 'type */safebrowse* followed by unformatted urls.\nWe will check them for suspected threats')
    expect(help.message).toEqual(helpWelcomeData)
  })

  it('should advise that no urls were found', () => {
    var help = new HelpBlock('tangoyankee', 'we did not find any urls to check')
    expect(help.message).toEqual(helpInputData)
  })
})
