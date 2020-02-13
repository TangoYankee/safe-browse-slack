'use strict'
const { Hypertext } = require('./hypertext')

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

  setHyperText = (text) => {
    /* destination urls, display text, and their meta data */
    var rawHypertextInputs = getRawMarkdownHyperTexts(text)
    var hypertexts = []
    if (rawHypertextInputs !== null) {
      for (var rawHypertextInput of rawHypertextInputs) {
        var refinedHypertextInput = getRefinedHypertextInput(rawHypertextInput)
        var displayText = setDisplayText(refinedHypertextInput)
        var destUrl = setDestUrl(refinedHypertextInput)
        if (validateDisplayText(displayText) && validateDestUrl(destUrl)) {
          var hypertext = new Hypertext(destUrl, displayText)
          hypertexts.push(hypertext)
        }
      }
    }
    return hypertexts
  }
}


module.exports = {
  Message
}
