'use strict'

const ThreatCache = require('../threat-cache')

describe('manage the threat cache', ()=>{
  it('should exist', ()=>{
    expect(new ThreatCache().exists).toBe(true)
  })
})
