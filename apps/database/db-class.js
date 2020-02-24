'use strict'

// const MongoClient = require('mongodb').MongoClient
// const process = require('process')

// var clusterUri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@ty-db-xadwv.mongodb.net/markdownlinksdb?retryWrites=true&w=majority`

// connection = await MongoClient.connect(global.__MONGO_URI__, {
//   useNewUrlParser: true
// })
// db = connection.db(global.__MONGO_DB_NAME__)

class Database {
  constructor (db) {
    this.db = db
    this.teams = this.db.collection('teams')
  }

  async storeTeamToken (teamID, accessTokenCipher) {
    var teamRecord = await this.teams.findOne({
      team_id: teamID
    })
    if (teamRecord) {
      await this.teams.findOneAndUpdate({
        team_id: teamID
      },
      {
        $set:
            { access_token_cipher: accessTokenCipher }
      })
    } else if (!teamRecord) {
      await this.teams.insertOne({
        team_id: teamID,
        access_token_cipher: accessTokenCipher
      })
    }
  }
}

module.exports = { Database }
