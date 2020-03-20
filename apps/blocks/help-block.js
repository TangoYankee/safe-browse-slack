'use strict'

class HelpBlock {
  message (userID, feedback) {
    this.userID = userID
    this.feedback = feedback
    return {
      response_type: 'ephemeral',
      blocks: this._blocks
    }
  }

  get _blocks () {
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
        text: this.feedback
      }
    }]
  }
}

module.exports = HelpBlock
