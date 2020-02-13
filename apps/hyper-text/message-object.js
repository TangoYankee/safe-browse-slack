'use strict'

class Message {
  constructor(text, userId) {
    /* message with meta data stored in an object */
    this.text = text
    this.sharedBy = userId
    this.safeBrowseSuccess = true
    this.allSharedAsHttpSecure = true
    this.threatTypes = []
    this.hypertexts = []
  }
}

class Hypertext {
  constructor (destUrl, displayText) {
  /* each link and its meta data stored in an object */
    this.destUrl = destUrl
    this.dispayText = displayText
    this.urlDomainKey = this.setUrlDomainKey(),
    this.cacheDuration = '',
    this.inCache = false,
    this.sharedAsHttpSecure = this.sharedAsHttpSecure(destUrl),
    this.threatMatch = ''
  }

  setUrlDomainKey = () => {
    /* remove http(s) and www for consistency across safe browse, cache, and multiple user requests */
    var domainPrefixRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)/gm
    return this.destUrl.replace(domainPrefixRegex, '')
  }

  setSharedAsHttpSecure = (destUrl) => {
    /* url was originally prefaced with 'https' */
    var destUrlLower = this.destUrl.toLowerCase()
    return destUrlLower.startsWith('https://')
  }

  slackHypertextSyntax = () => {
    /* slack hypertext syntax for urls and text */
    return `<${this.destUrl}|${this.displayText}>`
  }

  markdownHypertextSyntax = () => {
    /* markdown hypertext syntax for urls and text */
    return `[${this.dispayText}](${this.destUrl})`
  }

}

module.exports = {
  Message,
  Hypertext
}
