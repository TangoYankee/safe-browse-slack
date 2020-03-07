'use strict'

const { SafeBrowse } = require('../safe-browse-class')

describe('safebrowse class exists', () => {
  var safeBrowse

  beforeAll(() => {
    safeBrowse = new SafeBrowse
  })
  it('exists', () => {
    expect(safeBrowse.exists).toBe(true)
  })
})

