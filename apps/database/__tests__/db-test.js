'use strict'

const MongoClient = require('mongodb').MongoClient
const { Database } = require('../db')
const cryptoRandomString = require('crypto-random-string')
const { TokenCrypto } = require('../../credential/token-crypto')
const { TestCrypto } = require('../../credential/test-data/token-crypto-data')

describe('insert and update a team token', () => {
  var connection
  var db
  var markdownlinksdb
  var teamsCollection
  var teamID
  var tokenOne
  var tokenTwo
  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, { useNewUrlParser: true })
    db = connection.db(global.__MONGO_DB_NAME__)
    teamsCollection = db.collection('teams')
    markdownlinksdb = new Database('markdownlinksdb')
    teamID = cryptoRandomString({ length: 9 })
    var tokenCrypto = new TokenCrypto()
    var testCrypto = new TestCrypto()
    tokenCrypto.tokenKey = testCrypto.tokenKey
    tokenOne = tokenCrypto.encrypt(testCrypto.tokenPlain)
    tokenTwo = tokenCrypto.encrypt(testCrypto.tokenPlain)
  })

  afterAll(async () => {
    await connection.close()
    await db.close()
  })

  it('inserts a team into the collection',
    async () => {
      await markdownlinksdb._storeTeamToken(teamID, tokenOne, teamsCollection)
      var insertedTeam = await teamsCollection.findOne({ team_id: teamID })
      expect(tokenOne).toEqual(insertedTeam.access_token_cipher)
    })

  it('updates the team with a new token',
    async () => {
      await markdownlinksdb._storeTeamToken(teamID, tokenTwo, teamsCollection)
      var updatedTeam = await teamsCollection.findOne({ team_id: teamID })
      expect(tokenTwo).toEqual(updatedTeam.access_token_cipher)
    })
})
