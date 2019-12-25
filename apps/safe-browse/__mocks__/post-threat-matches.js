const { response, suspectedThreats } = require('../test-data/post-threat-matches-data')

const postThreatMatches = (requestBody) => {
  /* mock database of threats suspected by safe browse */
  var customResponse = JSON.parse(JSON.stringify(response)) // Deep copy clone
  return new Promise(resolve => {
    if (requestBody.threatInfo) {
      for (var threatEntry of requestBody.threatInfo.threatEntries) {
        var match = suspectedThreats.find(matches => matches.threat.url === threatEntry.url)
        if (match) {
          customResponse.body.matches.push(match)
        }
      }
    }
    resolve(customResponse.body)
  })
}

module.exports = {
  postThreatMatches
}
