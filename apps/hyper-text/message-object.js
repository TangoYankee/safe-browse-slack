'use strict'

const setMessageData = (text, userId) => {
  /* message with meta data stored in an object */
  return {
    message: text,
    sharedBy: userId,
    safeBrowseSuccess: true,
    allSharedAsHttpSecure: true,
    threatTypes: [],
    links: []
  }
}

const setHyperTextData = (markdownHyperText, slackHyperText, urlDomainKey, sharedAsHttpSecure) => {
  /* each link and its meta data stored in an object */
  return {
    urlDomainKey: urlDomainKey,
    cacheDuration: '',
    inCache: false,
    markdownLink: markdownHyperText,
    messageLink: slackHyperText,
    sharedAsHttpSecure: sharedAsHttpSecure,
    threatMatch: ''
  }
}

module.exports = {
  setMessageData,
  setHyperTextData
}
