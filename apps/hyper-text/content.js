'use strict'

// May still be useful
const validateDestUrl = (destUrl) => {
  /* must fit the correct format of a url */
  var destUrlLower = destUrl.toLowerCase()
  var domainRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm
  if (destUrlLower.match(domainRegex)) {
    return true
  } else {
    return false
  }
}

// Should be rendered useless by Slack validation
const validateDisplayText = (displayText) => {
  /* link string cannot be blank or only spaces */
  var displayTextTrim = displayText.trim()
  if (displayTextTrim) {
    return true
  } else {
    return false
  }
}

// New regex needed to find hyperlinks
const getRawMarkdownHyperTexts = (text) => {
  /* identify entire portion of markdown syntax from original user input */
  var markdownHyperTextRegex = /(\[.*?\]\(.*?\))/gm
  return text.match(markdownHyperTextRegex)
}

// Should be rendered useless
const getMarkdownHyperText = (rawMarkdownHyperText) => {
  /* identify refined portion of markdown syntax, without extra leading opening brackets */
  var openBracket = '['
  var bracketParenPosition = rawMarkdownHyperText.indexOf('](')
  var displayText = rawMarkdownHyperText.slice(0, bracketParenPosition)
  var lastOpenBracketPosition = displayText.lastIndexOf(openBracket)
  return rawMarkdownHyperText.slice(lastOpenBracketPosition)
}

// Should be useless
const setDestUrl = (markdownHyperText) => {
  /* identify url portion of link from message string, without padding spaces */
  var bracketParenPosition = markdownHyperText.indexOf('](')
  return markdownHyperText.slice(bracketParenPosition + 2, -1)
}

// No need to render diplay text
const setDisplayText = (markdownHyperText) => {
  /* identify text portion of hyperlink from message string */
  var bracketParenPosition = markdownHyperText.indexOf('](')
  return markdownHyperText.slice(1, bracketParenPosition)
}

// May still need to format as hyperlink
const setSlackHyperText = (destUrl, displayText) => {
  /* slack hypertext syntax for urls and text */
  return `<${destUrl}|${displayText}>`
}

// No longer enforcing https or http prefix
const setHttpDestUrl = (destUrl) => {
  /* each link has http or https in the url */
  var destUrlLower = destUrl.toLowerCase()
  if (destUrlLower.startsWith('http://') || destUrlLower.startsWith('https://')) {
    return destUrl
  } else {
    return `https://${destUrl}`
  }
}

// KEEP
const setUrlDomainKey = (unhttpedLinkAddress) => {
  /* remove http(s) and www for consistency across safe browse, cache, and multiple user requests */
  var domainPrefixRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)/gm
  return unhttpedLinkAddress.replace(domainPrefixRegex, '')
}

// DISCARD
const setSharedAsHttpSecure = (unhttpedLinkAddress) => {
  /* url was originally prefaced with 'https' */
  var unhttpedLinkAddressLower = unhttpedLinkAddress.toLowerCase()
  return unhttpedLinkAddressLower.startsWith('https://')
}

// DISCARD
const setAllSharedAsHttpSecure = (messageData) => {
  /* all urls were originally prefaced with 'https' */
  messageData.allSharedAsHttpSecure = true
  for (var link of messageData.links) {
    if (!link.sharedAsHttpSecure) {
      messageData.allSharedAsHttpSecure = false
    }
  }
  return messageData
}

module.exports = {
  validateDestUrl,
  validateDisplayText,
  setSlackHyperText,
  getRawMarkdownHyperTexts,
  setDestUrl,
  setDisplayText,
  getMarkdownHyperText,
  setHttpDestUrl,
  setUrlDomainKey,
  setSharedAsHttpSecure,
  setAllSharedAsHttpSecure
}
