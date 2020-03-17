'use strict'

class HelpBlock {
  constructor(userID) {
    this.userID = userID
  }
  get message() {
    return {
      response_type: 'ephemeral',
      blocks: this._blocks
    }
  }

  get _blocks() {
    return [{
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `:confetti_ball: *welcome,* <@${this.userID}>!`
      }
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'type */safebrowse* followed by unformatted urls.\nWe will check them for suspected threats'
      }
    }]
  }
}

module.exports = HelpBlock
