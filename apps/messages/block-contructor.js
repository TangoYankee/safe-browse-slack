const { sharedWithoutHttpsData, safeBrowseStatusData, safeBrowseThreatsData } = require('../safe-browse/warnings')
const { mrkdwnTemplate } = require('./block-templates')

const appendEmoji = (messageLink, emoji) => {
  /* emojis act as notes on the destination urls */
  return `${messageLink}:${emoji}:`
}

const messageLogic = (messageData) => {
  /* construct slack message based on message object */
  let message = messageData.message
  for (var link of messageData.links) {
    var markdownLink = link.markdownLink
    let messageLink = link.messageLink
    var threatMatch = link.threatMatch
    // Create flow for '' to equal 'NONE_FOUND'
    if (threatMatch !== '') {
      var threatEmoji = safeBrowseThreatsData[threatMatch].emoji
      // Expanded version of markdownlinl
      messageLink = appendEmoji(markdownLink, threatEmoji)
    } else if(threatMatch === ''){
      var threatEmoji = safeBrowseThreatsData['NONE_FOUND'].emoji
      messageLink = appendEmoji(messageLink, threatEmoji)
    }
    var sharedAsHttpSecure = link.sharedAsHttpSecure
    if (!sharedAsHttpSecure) {
      var httpSecureEmoji = sharedWithoutHttpsData.emoji
      messageLink = appendEmoji(messageLink, httpSecureEmoji)
    }
    message = message.replace(markdownLink, messageLink, message)
  }
  return message
}

const setSafeBrowseWarningData = () => {
  /* indicate safe browse was not successfully called */
  return safeBrowseStatusData.error_checking_safe_browse
}

const setWarningText = (warning) => {
  /* message for the emoji note left on destination urls */
  return `:${warning.emoji}: ${warning.text}`
}

const sharedContextLogic = (sharedContextBlock, messageData) => {
  /* indicate when a destination url was shared without https specified */
  if (!messageData.allSharedAsHttpSecure) {
    var httpsWarningText = setWarningText(sharedWithoutHttpsData)
    var httpsWarning = mrkdwnTemplate(httpsWarningText)
    sharedContextBlock.elements.push(httpsWarning)
  }
  return sharedContextBlock
}

const threatLogic = (threatBlock, threatTypes) => {
  /* list all of the suspected threats found in the destination urls */
  if (threatTypes.length >= 1) {
    for (var threat of threatTypes) {
      var threatWarningText = setWarningText(safeBrowseThreatsData[threat])
      var threatWarning = mrkdwnTemplate(threatWarningText)
      threatBlock.elements.push(threatWarning)
    }
    return threatBlock
  } else {
    return null
  }
}

module.exports = {
  appendEmoji,
  setSafeBrowseWarningData,
  setWarningText,
  messageLogic,
  sharedContextLogic,
  threatLogic
}
