'use strict'

const Warnings = require('../blocks/warnings')

class ReportBlock extends Warnings {
  message (report) {
    this.report = report
    return {
      response_type: 'ephemeral',
      blocks: this._blocks
    }
  }

  get _blocks () {
    return [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: this._text
        }
      },
      {
        type: 'divider'
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: 'For more info, explore <https://developers.google.com/safe-browsing/v4/advisory|Google Safe Browse>'
          }
        ]
      }
    ]
  }

  get _text () {
    var text = ''
    for (var [url, value] of Object.entries(this.report)) {
      text += `${url} ${this.context(value.threatMatch)}`
    }
    return text
  }
}

module.exports = ReportBlock
