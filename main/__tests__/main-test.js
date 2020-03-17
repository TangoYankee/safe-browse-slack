'use strict'

const request = require('supertest')
const server = require('../main')
const Signature = require('../../apps/credential/signature')
jest.mock('../../apps/credential/signature')

describe('recieve a request for safebrowse command', () => {

  afterEach(() => {
    server.close()
    Signature.mockClear()
  })

  it('should be valid', async () => {
    Signature.mockImplementation(() => {
      return { isValid: true }
    })
    const res = await request(server).post('/safebrowse')
    expect(res.status).toBe(200)
  })

  it('should not be valid', async () => {
    Signature.mockImplementation(() => {
      return { isValid: false }
    })
    const res = await request(server).post('/safebrowse')
    expect(res.status).toBe(400)
    expect(res.text).toBe('Ignore this request')
  })
})
