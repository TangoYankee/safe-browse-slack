const { response, suspectedThreats } = require('../test-data/post-threat-matches-data')

const postThreatMatches = (requestBody) => {
  /* mock database of threats suspected by safe browse */
  var customResponse = response()
  return new Promise(resolve => {
    if (requestBody.threatInfo) {
      var matches = []
      for (var threatEntry of requestBody.threatInfo.threatEntries) {
        var match = suspectedThreats.find(suspectedMatches => suspectedMatches.threat.url === threatEntry.url)
        if (match) {
          matches.push(match)
        }
      }
    }
    if (matches.length >= 1) {
      customResponse.body['matches'] = matches
    }
    // console.log(JSON.stringify(customResponse.body))
    resolve(customResponse.body)
  })
}

module.exports = {
  postThreatMatches
}
