'use strict'

class Warnings {
  constructor () {
    this.MALWARE = {
      emoji: 'beetle',
      text: 'malware',
      resource: 'https://www.stopbadware.org/'
    }

    this.SOCIAL_ENGINEERING = {
      emoji: 'biohazard_sign',
      text: 'social engineering',
      resource: 'https://googleonlinesecurity.blogspot.com/2015/11/safe-browsing-protection-from-even-more.html'
    }

    this.UNWANTED_SOFTWARE = {
      emoji: 'no_entry_sign',
      text: 'unwanted software',
      resource: 'https://www.google.com/about/unwanted-software-policy.html'
    }

    this.THREAT_TYPE_UNSPECIFIED = {
      emoji: 'exclamation',
      text: 'unspecified threat',
      resource: 'https://developers.google.com/safe-browsing/v4/advisory'
    }

    this.POTENTIALLY_HARMFUL_APPLICATION = {
      emoji: 'exclamation',
      text: 'potentially harmful app',
      resource: 'https://developers.google.com/safe-browsing/v4/advisory'
    }

    this.SAFE_BROWSE_ERROR = {
      emoji: 'heavy_multiplication_x',
      text: 'error when checking this url',
      resource: 'https://developers.google.com/safe-browsing/v4/advisory'
    }

    this.NONE_FOUND = {
      emoji: 'small_blue_diamond',
      text: 'no suspected harmful content',
      resource: 'https://developers.google.com/safe-browsing/v4/advisory'
    }
  }

  context (threatMatch) {
    return `-reported <${this[threatMatch].resource}|${this[threatMatch].text}> :${this[threatMatch].emoji}:,\n`
  }
}

module.exports = Warnings
