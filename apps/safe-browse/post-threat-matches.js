const process = require('process')
const request = require('request')

const postThreatMatches = (requestBody) => {
  /* find threats that safe browse suspects */
  var requestUrl = 'https://safebrowsing.googleapis.com/v4/threatMatches:find'
  // Add timeout of 30s as an option
  var options = {
    url: requestUrl,
    body: requestBody,
    json: true,
    timeout: 1500,
    qs: { key: process.env.GOOGLE_SAFE_BROWSING_KEY }
  }
  return new Promise(resolve => {
    request.post(options, (error, response) => {
      if (error) {
        console.error(error)
        resolve('error')
      } else if (response.statusCode === 200) {
        resolve(response.body)
      } else {
        console.warn(response.statusCode)
        resolve('error')
      }
    })
  })
}

module.exports = {
  postThreatMatches
}
