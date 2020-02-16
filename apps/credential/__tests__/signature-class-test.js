'use strict'

const { Signature } = require('../signature-class')
const { slackRequest } = require('../test-data/signature-data')


describe('build signature', () => {
  var signature
  beforeAll(() =>{
    signature = new Signature(slackRequest)
  })

  it('should return the slack signature',
  () => {
    expect(signature.slackSignature).toEqual('v0=6a205d5c0edf4b801ef2f83e6c931d1e2d160ffcaad209df4506bce5ae9d6ffe')
  })

  it('should be a recent call',
  () => {
    expect(signature._isRecent).toEqual(true)
  })
})
