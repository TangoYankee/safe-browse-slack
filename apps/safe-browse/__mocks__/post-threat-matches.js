const { response, suspectedThreats } = require('../test-data/post-threat-matches-data')

const postThreatMatches = (requestBody) => {
  /* mock database of threats suspected by safe browse */
  var customResponse = response()
  return new Promise(resolve => {
    if (requestBody.threatInfo) {
      for (var threatEntry of requestBody.threatInfo.threatEntries) {
        var match = suspectedThreats.find(matches => matches.threat.url === threatEntry.url)
        if (match) {
          customResponse.body['matches'] = []
          customResponse.body.matches.push(match)
        }
      }
    }
    console.log(JSON.stringify(customResponse.body))
    resolve(customResponse.body)
  })
}

module.exports = {
  postThreatMatches
}
