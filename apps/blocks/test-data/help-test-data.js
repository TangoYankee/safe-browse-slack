'use strict'

var helpTestData = {
  response_type: 'ephemeral',
  blocks: [{
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `:confetti_ball: *welcome,* <@tangoyankee>!`
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

module.exports = helpTestData
