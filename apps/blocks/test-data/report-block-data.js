'use strict'

const reportIn = {
  'testsafebrowsing.appspot.com/s/malware.html': { threatMatch: 'MALWARE' },
  'testsafebrowsing.appspot.com/s/phishing.html': { threatMatch: 'SOCIAL_ENGINEERING' },
  'testsafebrowsing.appspot.com/s/unwanted.html': { threatMatch: 'UNWANTED_SOFTWARE' },
  'nasa.gov': { threatMatch: 'NONE_FOUND' },
  'https://www.google.com/maps/place/Emerils+New+Orleans/@29.944616,-90.0694747,17z/data=!3m1!4b1!4m5!3m4!1s0x8620a6718f86a9a7:0x6ab2069a8e2a2d7d!8m2!3d29.944616!4d-90.067286':
    { threatMatch: 'SAFE_BROWSE_ERROR' },
  'dmv.ca.gov': { threatMatch: 'POTENTIALLY_HARMFUL_APPLICATION' }
}

const blockOut = {
  response_type: 'ephemeral',
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'testsafebrowsing.appspot.com/s/malware.html -reported <https://www.stopbadware.org/|malware> :beetle:,\ntestsafebrowsing.appspot.com/s/phishing.html -reported <https://googleonlinesecurity.blogspot.com/2015/11/safe-browsing-protection-from-even-more.html|social engineering> :biohazard_sign:,\ntestsafebrowsing.appspot.com/s/unwanted.html -reported <https://www.google.com/about/unwanted-software-policy.html|unwanted software> :no_entry_sign:,\nnasa.gov -reported <https://developers.google.com/safe-browsing/v4/advisory|no suspected harmful content> :small_blue_diamond:,\nhttps://www.google.com/maps/place/Emerils+New+Orleans/@29.944616,-90.0694747,17z/data=!3m1!4b1!4m5!3m4!1s0x8620a6718f86a9a7:0x6ab2069a8e2a2d7d!8m2!3d29.944616!4d-90.067286 -reported <https://developers.google.com/safe-browsing/v4/advisory|error when checking this url> :heavy_multiplication_x:,\ndmv.ca.gov -reported <https://developers.google.com/safe-browsing/v4/advisory|potentially harmful app> :exclamation:,\n'
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

module.exports = {
  reportIn,
  blockOut
}
