'use strict'

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

const validateDisplayText = (displayText) => {
  /* link string cannot be blank or only spaces */
  var displayTextTrim = displayText.trim()
  if (displayTextTrim) {
    return true
  } else {
    return false
  }
}

const getRawMarkdownHyperTexts = (text) => {
  /* identify entire portion of markdown syntax from original user input */
  var markdownHyperTextRegex = /(\[.*?\]\(.*?\))/gm
  return text.match(markdownHyperTextRegex)
}

const getMarkdownHyperText = (rawMarkdownHyperText) => {
  /* identify refined portion of markdown syntax, without extra leading opening brackets */
  var openBracket = '['
  var bracketParenPosition = rawMarkdownHyperText.indexOf('](')
  var displayText = rawMarkdownHyperText.slice(0, bracketParenPosition)
  var lastOpenBracketPosition = displayText.lastIndexOf(openBracket)
  return rawMarkdownHyperText.slice(lastOpenBracketPosition)
}

const setDestUrl = (markdownHyperText) => {
  /* identify url portion of link from message string, without padding spaces */
  var bracketParenPosition = markdownHyperText.indexOf('](')
  return markdownHyperText.slice(bracketParenPosition + 2, -1)
}

const setDisplayText = (markdownHyperText) => {
  /* identify text portion of hyperlink from message string */
  var bracketParenPosition = markdownHyperText.indexOf('](')
  return markdownHyperText.slice(1, bracketParenPosition)
}

const setSlackHyperText = (destUrl, displayText) => {
  /* slack hypertext syntax for urls and text */
  return `<${destUrl}|${displayText}>`
}

const setHttpDestUrl = (destUrl) => {
  /* each link has http or https in the url */
  var destUrlLower = destUrl.toLowerCase()
  if (destUrlLower.startsWith('http://') || destUrlLower.startsWith('https://')) {
    return destUrl
  } else {
    return `https://${destUrl}`
  }
}

// const setUrlDomainKey = (unhttpedLinkAddress) => {
//   /* remove http(s) and www for consistency across safe browse, cache, and multiple user requests */
//   var domainPrefixRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)/gm
//   return unhttpedLinkAddress.replace(domainPrefixRegex, '')
// }

// const setSharedAsHttpSecure = (unhttpedLinkAddress) => {
//   /* url was originally prefaced with 'https' */
//   var unhttpedLinkAddressLower = unhttpedLinkAddress.toLowerCase()
//   return unhttpedLinkAddressLower.startsWith('https://')
// }

const setAllSharedAsHttpSecure = (messageDataLinks) => {
  /* all urls were originally prefaced with 'https' */
  // messageData.allSharedAsHttpSecure = true
  for (var link of messageDataLinks) {
    if (!link.sharedAsHttpSecure) {
      // messageData.allSharedAsHttpSecure = false
      return false
    }
  }
  return true
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
