'use strict'

const request = require('supertest')
// const server = require('../main')

const Signature = require('../../apps/credential/signature')
jest.mock('../../apps/credential/signature')

const { helpWelcomeData, helpInputData } = require('../test-data/sb-no-urls-data')

describe('should make valid requests without urls', () => {
  var server
  beforeEach(() => {
    delete require.cache[require.resolve('../main')]
    server = require('../main')
    Signature.mockImplementationOnce(() => {
      return { isValid: true }
    })
  })

  afterEach(() => {
    server.close()
    Signature.mockClear()
  })

  it('should recieve no text', async (done) => {
    await request(server)
      .post('/safebrowse')
      .send({
        user_id: 'tangoyankee',
        text: ''
      })
      .expect('Content-Type', /json/)
      .expect(200, helpInputData)
    done()
  })

  it('should request help', async (done) => {
    await request(server)
      .post('/safebrowse')
      .send({
        user_id: 'tangoyankee',
        text: 'help'
      })
      .expect('Content-Type', /json/)
      .expect(200, helpWelcomeData)
    done()
  })

  it('should recieve text but no urls', async (done) => {
    await request(server)
      .post('/safebrowse')
      .send({
        user_id: 'tangoyankee',
        text: '<@UH00Z00Z0|dev.user>'
      })
      .expect('Content-Type', /json/)
      .expect(200, helpInputData)
    done()
  })
})

describe('should make an invalid request', () => {
  var server
  beforeEach(() => {
    delete require.cache[require.resolve('../main')]
    server = require('../main')
    Signature.mockImplementationOnce(() => {
      return { isValid: false }
    })
  })
  afterEach(() => {
    server.close()
    Signature.mockClear()
  })

  it('should not be valid', async (done) => {
    const res = await request(server).post('/safebrowse')
    expect(res.status).toBe(400)
    expect(res.text).toBe('Ignore this request')
    done()
  })
})
