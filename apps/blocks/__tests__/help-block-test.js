'use strict'

const HelpBlock = require('../help-block')
const { helpWelcomeData, helpInputData } = require('../test-data/help-block-data')

describe('it should be formatted to fit slack blocks', () => {
  var helpBlock = new HelpBlock()
  it('should explain how to use the application', () => {
    expect(helpBlock.message('tangoyankee', 'type */safebrowse* followed by unformatted urls.\nWe will check them for suspected threats'))
      .toEqual(helpWelcomeData)
  })

  it('should advise that no urls were found', () => {
    expect(helpBlock.message('tangoyankee', 'we did not find any urls to check'))
      .toEqual(helpInputData)
  })
})
