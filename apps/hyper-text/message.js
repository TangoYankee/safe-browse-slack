'use strict'
const { Hypertext } = require('./hypertext')

class Message {
  constructor(text, userId) {
    /* message with meta data stored in an object */
    this.text = text
    this.sharedBy = userId
    this.safeBrowseSuccess = true
    this.rawHypertexts = this.setRawHypertexts()
    this.hypertexts = this.setHyperTexts()
    this.allSharedAsHttpSecure = this.setAllSharedAsHttpSecure()
    this.threatTypes = []
  }

  setRawHypertexts = () => {
    /* identify entire portion of markdown syntax from original user input */
    var markdownHyperTextRegex = /(\[.*?\]\(.*?\))/gm
    return this.text.match(markdownHyperTextRegex)
  }

  setHyperTexts = () => {
    /* destination urls, display text, and their meta data */
    var hypertexts = []
    if (this.rawHypertexts !== null) {
      for (var rawHypertext of this.rawHypertexts) {
        var hypertext = new Hypertext(rawHypertext)
        if (hypertext.isValid) {
          hypertexts.push(hypertext)
          }
      }
    }
    return hypertexts
  }

  setAllSharedAsHttpSecure = () => {
    /* all urls were originally prefaced with 'https' */
    for (var hypertext of this.hypertexts) {
      if (!hypertext.sharedAsHttpSecure) {
        return false
      }
    }
    return true
  }

  getInCacheThreatMatches = (inCacheThreatMatches) => {
      /* save threat matches to message object */
      for (var urlDomainKey in inCacheThreatMatches) {
        var threatMatch = inCacheThreatMatches[urlDomainKey].threatMatch
        for (this.hypertext of this.hypertexts) {
          if (this.hypertext.urlDomainKey === urlDomainKey) {
            this.hypertext.threatMatch = threatMatch
            this.hypertext.inCache = true
            var threatMatchInThreatTypes = this.threatTypes.includes(threatMatch)
            if (!threatMatchInThreatTypes) {
              this.threatTypes.push(threatMatch)
            }
          }
        }
      }
    }
}

module.exports = {
  Message
}
