'use strict'

const setSafeBrowseThreatTypes = (messageData, threatMatches) => {
  /* add threat type to the original message */
  if (threatMatches.matches) {
    for (var threatMatch of threatMatches.matches) {
      for (var link of messageData.links) {
        if (link.urlDomainKey === threatMatch.threat.url) {
          link.threatMatch = threatMatch.threatType
          link.cacheDuration = threatMatch.cacheDuration
          link.inCache = false
          var threatMatchInThreatTypes = messageData.threatTypes.includes(threatMatch.threatType)
          if (!threatMatchInThreatTypes) {
            messageData.threatTypes.push(threatMatch.threatType)
          }
        }
      }
    }
  }
  return messageData
}

module.exports = {
  setSafeBrowseThreatTypes
}
