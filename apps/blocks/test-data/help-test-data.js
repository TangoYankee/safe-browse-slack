'use strict'

var helpWelcomeData = {
  response_type: 'ephemeral',
  blocks: [{
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: ':confetti_ball: *welcome,* <@tangoyankee>!'
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

var helpInputData = {
  response_type: 'ephemeral',
  blocks: [{
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: ':confetti_ball: *welcome,* <@tangoyankee>!'
    }
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: 'we did not find any urls to check'
    }
  }]
}

module.exports = {
  helpWelcomeData,
  helpInputData
}
