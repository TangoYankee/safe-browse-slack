'use strict'

const MongoClient = require('mongodb').MongoClient
// const process = require('process')

// var clusterUri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@ty-db-xadwv.mongodb.net/markdownlinksdb?retryWrites=true&w=majority`

class Database {
  constructor (databaseName) {
    this.clusterUri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@ty-db-xadwv.mongodb.net/${databaseName}?retryWrites=true&w=majority`
  }

  get _client() {
    this.client = MongoClient(this.clusterUri, {useNewUrlParser: true})
  }

  saveTeam (teamID, accessTokenCipher) {
    this._client()
    this.client.connect(async(err) => {
      if (err) {
        console.error(`error connecting to database: ${err}`)
      } else {
        var teams = this.client.db('markdownlinksdb').collection('teams')
        await this._checkTeam(teamID, accessTokenCipher, teams)
      }
    })
    this.client.close()
  }

  async _checkTeam (teamId, accessTokenCipher, teams) {
    /* look for an existing team record */
    var teamRecord = await teams.findOne({
      team_id: teamId
    })
    if (teamRecord) {
      await teams.findOneAndUpdate({
        team_id: teamId
      },
      {
        $set:
            { access_token_cipher: accessTokenCipher }
      })
    } else if (!teamRecord) {
      await teams.insertOne({
        team_id: teamId,
        access_token_cipher: accessTokenCipher
      })
    }
  }
}

module.exports = { Database }
