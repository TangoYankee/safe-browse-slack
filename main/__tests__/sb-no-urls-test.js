'use strict'

const request = require('supertest')

const Signature = require('../../apps/credential/signature')
const server = require('../main')
jest.mock('../../apps/credential/signature')

const { helpWelcomeData, helpInputData } = require('../test-data/sb-no-urls-data')

describe('should make valid requests without urls', () => {
  beforeEach(() => {
    Signature.mockImplementationOnce(() => {
      return { isValid: true }
    })
  })

  afterEach(() => {
    Signature.mockClear()
  })

  afterAll((done) => {
    server.close(done)
  })

  it('should recieve no text', async () => {
    await request(server)
      .post('/sb-command')
      .send({
        user_id: 'tangoyankee',
        text: ''
      })
      .expect('Content-Type', /json/)
      .expect(200, helpInputData)
  })

  it('should request help', async () => {
    await request(server)
      .post('/sb-command')
      .send({
        user_id: 'tangoyankee',
        text: 'help'
      })
      .expect('Content-Type', /json/)
      .expect(200, helpWelcomeData)
  })

  it('should recieve text but no urls', async () => {
    await request(server)
      .post('/sb-command')
      .send({
        user_id: 'tangoyankee',
        text: '<@UH00Z00Z0|dev.user>'
      })
      .expect('Content-Type', /json/)
      .expect(200, helpInputData)
  })
})

describe('should make an invalid request', () => {
  beforeEach(() => {
    Signature.mockImplementationOnce(() => {
      return { isValid: false }
    })
  })
  afterEach(() => {
    Signature.mockClear()
  })

  afterAll((done) => {
    server.close(done)
  })

  it('should not be valid', async () => {
    const res = await request(server).post('/sb-command')
    expect(res.status).toBe(400)
    expect(res.text).toBe('Ignore this request')
  })
})
