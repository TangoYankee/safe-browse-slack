'use strict'

const { Signature } = require('../signature')
const { slackRequest } = require('../test-data/signature-data')


describe('the request is invalid, with a recent time but a wrong signature', () => {
  var signature
  beforeAll(() =>{
    signature = new Signature(slackRequest)
    signature.timestamp = Math.floor(new Date().getTime()/ 1e3)
    signature.currentTime = Math.floor(new Date().getTime()/ 1e3) + 1e2
  })

  it('should be a recent call',
  () => {
    expect(signature._isRecent).toBe(true)
  })

  it('should have an incorrect signature',
  () => {
    expect(signature._isCorrectSignature).toBe(false)
  })

  it('should be an invalid request',
  () => {
    expect(signature.isValid).toBe(false)
  })


})

describe('the request is invalid, with a correct signature but an old time', () => {
  var signature
  beforeAll(() =>{
    signature = new Signature(slackRequest)
    signature.timestamp = '1531420618'
    signature.currentTime = '2e10'
  })

  it('should be an old call',
  () => {
    expect(signature._isRecent).toBe(false)
  })

  it('should be a correct signature',
  () => {
    expect(signature._isCorrectSignature).toBe(true)
  })

  it('should be an invalid request',
  () => {
    expect(signature.isValid).toBe(false)
  })
})

describe('the request is invalid, with a wrong signature and an old time', () => {
  var signature
  beforeAll(() =>{
    signature = new Signature(slackRequest)
    signature.timestamp = '0'
    signature.currentTime = '4e2'
  })

  it('should be an old call',
  () => {
    expect(signature._isRecent).toBe(false)
  })

  it('should be a wrong signature',
  () => {
    expect(signature._isCorrectSignature).toBe(false)
  })

  it('should be an invalid request',
  () => {
    expect(signature.isValid).toBe(false)
  })
})

describe('the request is valid, with a correct signature and a recent time', () => {
  var signature
  beforeAll(() =>{
    signature = new Signature(slackRequest)
    signature.timestamp = '1531420618'
    signature.currentTime = '1531420618'
  })

  it('should be a recent call',
  () => {
    expect(signature._isRecent).toBe(true)
  })

  it('should be a correct signature',
  () => {
    expect(signature._isCorrectSignature).toBe(true)
  })

  it('should be an valid request',
  () => {
    expect(signature.isValid).toBe(true)
  })
})
