var userId = 12345678
var helpMessage = {
  response_type: 'ephemeral',
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `:confetti_ball: *welcome,* <@${userId}>!\n_format your hyperlinks like this..._`
      }
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*your message*\n _/markdownlinks create [nice links](https://markdownguide.org/)._'
      }
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*returned message*\n _create <https://markdownguide.org/|nice links>._'
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
          text: 'visit https://markdownlinks.io'
        }
      ]
    }
  ]
}

var errorMessage = {
  response_type: 'ephemeral',
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: ':warning:please provide input text'
      }
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*For instructions, write...* _/markdownlinks help_'
      }
    }
  ]
}

var markdownSyntax = 'example text'
var markdownMessage = {
  response_type: 'in_channel',
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `${markdownSyntax}`
      }
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `-shared by <@${userId}>`
        }
      ]
    }
  ]
}

var messageData = {
  message: '[Malware Site](testsafebrowsing.appspot.com/s/malware.html) and [Nasa](nasa.gov)',
  sharedBy: 'TangoYankee',
  safeBrowseSuccess: true,
  allSharedAsHttpSecure: false,
  threatTypes: [
    'MALWARE'
  ],
  links: [
    {
      cacheKeyFromUrl: 'testsafebrowsing.appspot.com/s/malware.html',
      cacheDuration: '300s',
      inCache: false,
      markdownLink: '[Malware Site](testsafebrowsing.appspot.com/s/malware.html)',
      messageLink: '<https://testsafebrowsing.appspot.com/s/malware.html|Malware Site>',
      sharedAsHttpSecure: false,
      threatMatch: 'MALWARE'
    },
    {
      cacheKeyFromUrl: 'nasa.gov',
      cacheDuration: '',
      inCache: false,
      markdownLink: '[Nasa](nasa.gov)',
      messageLink: '<https://nasa.gov|Nasa>',
      sharedAsHttpSecure: false,
      threatMatch: ''
    }
  ]
}

var messageFormat = {
  response_type: 'in_channel',
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '[Malware Site](testsafebrowsing.appspot.com/s/malware.html):beetle::eyes: and <https://nasa.gov|Nasa>:eyes:'
      }
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: '-shared by @TangoYankee'
        },
        {
          type: 'mrkdwn',
          text: ':eyes: shared without <https://www.snopes.com/fact-check/http-vs-https/|https>'
        }
      ]
    },
    {
      type: 'divider'
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: ':warning: Suspected threats found by <https://developers.google.com/safe-browsing/v4/advisory|Google Safe Browse>:'
        }
      ]
    },
    {
      type: 'context',
      elements: [{
          type: 'mrkdwn',
          text: ':beetle: <https://www.stopbadware.org/|malware> '
        }
      ]
    }
  ]
}

module.exports = {
  userId,
  helpMessage,
  errorMessage,
  markdownSyntax,
  markdownMessage,
  messageData,
  messageFormat
}
