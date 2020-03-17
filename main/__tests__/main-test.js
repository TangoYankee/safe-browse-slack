'use strict'

const request = require('supertest')
const server = require('../main')

describe('recieve request from slack to check a threat url', () => {
  afterEach(() => {
    server.close()
  })

  it('should respond with a 200 code', async () => {
    const res = await request(server).post('/safebrowse').send({ name: 'john' })
    return expect(res.status).toBe(200)
  })

  it('should respond with a 404', async () => {
    const res = await request(server).get('/foo/bar')
    return expect(res.status).toBe(404)
  })
})
