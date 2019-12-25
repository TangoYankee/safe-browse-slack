const { response, suspectedThreats } = require('../test-data/post-threat-matches-data')

const postThreatMatches = (requestBody) => {
  /* mock database of threats suspected by safe browse */
  return new Promise(resolve => {
    if (response.statusCode === 200) {
      if (requestBody.threatInfo) {
        for (var threatEntry of requestBody.threatInfo.threatEntries) {
          var match = suspectedThreats.find(matches => matches.threat.url === threatEntry.url)
          if (match) {
            response.body.matches.push(match)
          }
        }
      }
      resolve(response.body)
    }
  })
}

module.exports = {
  postThreatMatches
}
