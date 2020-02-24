'use strict'

const MongoClient = require('mongodb').MongoClient

class Database {
  constructor (dbName) {
    this.clusterUri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@ty-db-xadwv.mongodb.net/${dbName}?retryWrites=true&w=majority`
    this.dbName = dbName
  }

  connectStoreDisconnect () {
    client = MongoClient(this.clusterUri, { useNewUrlParser: true })
    client.connect(async (err) => {
      if (err) {
        console.error(`error connecting to database: ${err}`)
      } else {
        var teamsCollection = client.db(this.dbName).collection('teams')
        await this._storeTeamToken(teamID, accessTokenCipher, teamsCollection)
        client.close()
      }
    })
  }

  async _storeTeamToken (teamID, accessTokenCipher, teamsCollection) {
    var teamRecord = await teamsCollection.findOne({
      team_id: teamID
    })
    if (teamRecord) {
      await teamsCollection.findOneAndUpdate({
        team_id: teamID
      },
      {
        $set:
            { access_token_cipher: accessTokenCipher }
      })
    } else if (!teamRecord) {
      await teamsCollection.insertOne({
        team_id: teamID,
        access_token_cipher: accessTokenCipher
      })
    }
  }
}

module.exports = { Database }
