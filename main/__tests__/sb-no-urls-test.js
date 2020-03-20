'use strict'

const request = require('supertest')
const server = require('../main')

const Signature = require('../../apps/credential/signature')
jest.mock('../../apps/credential/signature')

const { helpWelcomeData, helpInputData } = require('../test-data/sb-no-urls-data')

describe('should make valid requests without urls', () => {
  beforeEach((done) => {
    server.listen(done)
    Signature.mockImplementationOnce(() => {
      return { isValid: true }
    })
  })

  afterEach((done) => {
    server.close(done)
    Signature.mockClear()
  })

  it('should recieve no text', async () => {
    await request(server)
      .post('/safebrowse')
      .send({
        user_id: 'tangoyankee',
        text: ''
      })
      .expect('Content-Type', /json/)
      .expect(200, helpInputData)
  })

  it('should request help', async () => {
    await request(server)
      .post('/safebrowse')
      .send({
        user_id: 'tangoyankee',
        text: 'help'
      })
      .expect('Content-Type', /json/)
      .expect(200, helpWelcomeData)
  })

  it('should recieve text but no urls', async () => {
    await request(server)
      .post('/safebrowse')
      .send({
        user_id: 'tangoyankee',
        text: '<@UH00Z00Z0|dev.user>'
      })
      .expect('Content-Type', /json/)
      .expect(200, helpInputData)
  })
})

describe('should make an invalid request', () => {
  beforeEach((done) => {
    server.listen(done)
    Signature.mockImplementationOnce(() => {
      return { isValid: false }
    })
  })
  afterEach((done) => {
    server.close(done)
    Signature.mockClear()
  })

  it('should not be valid', async () => {
    const res = await request(server).post('/safebrowse')
    expect(res.status).toBe(400)
    expect(res.text).toBe('Ignore this request')
  })
})
