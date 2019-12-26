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
  message: '[Phishing Site](testsafebrowsing.appspot.com/s/phishing.html), [Unwanted Software](testsafebrowsing.appspot.com/s/unwanted.html), [Malware Site](testsafebrowsing.appspot.com/s/malware.html), and [Nasa](nasa.gov)',
  sharedBy: 'TangoYankee',
  safeBrowseSuccess: true,
  allSharedAsHttpSecure: false,
  threatTypes: [
    'SOCIAL_ENGINEERING',
    'UNWANTED_SOFTWARE',
    'MALWARE'
  ],
  links: [
    {
      urlDomainKey: 'testsafebrowsing.appspot.com/s/phishing.html',
      cacheDuration: '300s',
      inCache: false,
      markdownLink: '[Phishing Site](testsafebrowsing.appspot.com/s/phishing.html)',
      messageLink: '<https://testsafebrowsing.appspot.com/s/phishing.html|Phishing Site>',
      sharedAsHttpSecure: false,
      threatMatch: 'SOCIAL_ENGINEERING'
    },
    {
      urlDomainKey: 'testsafebrowsing.appspot.com/s/unwanted.html',
      cacheDuration: '300s',
      inCache: false,
      markdownLink: '[Unwanted Software](testsafebrowsing.appspot.com/s/unwanted.html)',
      messageLink: '<https://testsafebrowsing.appspot.com/s/unwanted.html|Unwanted Software>',
      sharedAsHttpSecure: false,
      threatMatch: 'UNWANTED_SOFTWARE'
    },
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
        text: '[Phishing Site](testsafebrowsing.appspot.com/s/phishing.html):biohazard_sign::eyes:, [Unwanted Software](testsafebrowsing.appspot.com/s/unwanted.html):no_entry_sign::eyes:, [Malware Site](testsafebrowsing.appspot.com/s/malware.html):beetle::eyes:, and <https://nasa.gov|Nasa>:eyes:'
      }
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: '-shared by <@TangoYankee>'
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
      elements: [
        {
          type: 'mrkdwn',
          text: ':biohazard_sign: <https://googleonlinesecurity.blogspot.com/2015/11/safe-browsing-protection-from-even-more.html|social engineering> '
        },
        {
          type: 'mrkdwn',
          text: ':no_entry_sign: <https://www.google.com/about/unwanted-software-policy.html|unwanted software> '
        },
        {
          type: 'mrkdwn',
          text: ':beetle: <https://www.stopbadware.org/|malware> '
        }
      ]
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Remove Message'
          },
          value: 'remove_message',
          style: 'danger'
        }
      ]
    }
  ]
}

var messageDataSafe = {
  message: '[Nasa](nasa.gov)',
  sharedBy: 'TangoYankee',
  safeBrowseSuccess: true,
  allSharedAsHttpSecure: false,
  threatTypes: [
  ],
  links: [
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

var messageFormatSafe = {
  response_type: 'in_channel',
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '<https://nasa.gov|Nasa>:eyes:'
      }
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: '-shared by <@TangoYankee>'
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
          text: ':small_blue_diamond: No suspected threats found by <https://developers.google.com/safe-browsing/v4/advisory|Google Safe Browse>:'
        }
      ]
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Remove Message'
          },
          value: 'remove_message',
          style: 'danger'
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
  messageFormat,
  messageDataSafe,
  messageFormatSafe
}
