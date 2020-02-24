'use strict'

const MongoClient = require('mongodb').MongoClient
const { Database } = require('../db-class')
const { teamId, teamTokenOne, teamTokentwo } = require('../test-data/db-data')

describe('insert and update a team token', () => {
  var connection
  var db
  var markdownlinksdb
  var teamsCollection
  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {useNewUrlParser: true})
    db = connection.db(global.__MONGO_DB_NAME__)
    teamsCollection = db.collection('teams')
    markdownlinksdb = new Database('markdownlinksdb')
  })

  afterAll(async () => {
    await connection.close()
    await db.close()
  })

  it('inserts a team into the collection',
    async () => {
      await markdownlinksdb._storeTeamToken(teamId, teamTokenOne, teamsCollection)
      var insertedTeam = await teamsCollection.findOne({ team_id: teamId })
      expect(teamTokenOne).toEqual(insertedTeam.access_token_cipher)
    })

  it('updates the team with a new token',
    async () => {
      await markdownlinksdb._storeTeamToken(teamId, teamTokentwo, teamsCollection)
      var updatedTeam = await teamsCollection.findOne({ team_id: teamId })
      expect(teamTokentwo).toEqual(updatedTeam.access_token_cipher)
    })
})
