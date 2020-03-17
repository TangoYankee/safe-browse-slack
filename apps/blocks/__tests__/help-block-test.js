'use strict'

const HelpBlock = require('../help-block')
const helpTestData = require('../test-data/help-test-data')

describe('it should be formatted to fit slack blocks', ()=>{
  it('should take a user ID', () => {
    var help = new HelpBlock('tangoyankee')
    expect(help.message).toEqual(helpTestData)
  })
})