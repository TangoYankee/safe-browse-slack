'use strict'
/* Delete entire module. No tokens will be stored in database */
const MongoClient = require('mongodb').MongoClient

class Database {
  /* instance of database connection to markdownlinks-sandbox */
  constructor (dbName) {
    this.clusterUri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0-i82sn.mongodb.net/{dbName}?retryWrites=true&w=majority`
    this.dbName = dbName
  }

  connectStoreDisconnect (teamID, accessTokenCipher) {
    /* open and close connection to database */
    var client = MongoClient(this.clusterUri, { useNewUrlParser: true, useUnifiedTopology: true })
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
    /* create or update encrypted token for a slack team */
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
