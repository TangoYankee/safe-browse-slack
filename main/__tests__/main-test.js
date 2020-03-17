'use strict'

const request = require('supertest')
const server = require('../main')

describe('recieve a request for safebrowse command', () => {
  afterEach(() => {
    server.close()
  })

  it('should be valid', async () => {
    const res = await request(server).post('/safebrowse').send({ data: 'valid' })
    expect(res.status).toBe(200)
  })

  it('should be outdated', async () => {
    const res = await request(server).post('/safebrowse').send({ data: 'old'})
    expect(res.status).toBe(400)
    expect(res.text).toBe('Ignore this request')
  })

  it('should be incorrect', async () => {
    const res = await request(server).post('/safebrowse').send({ data: 'incorrect'})
    expect(res.status).toBe(400)
    expect(res.text).toBe('Ignore this request')
  })
})
