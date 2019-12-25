const process = require('process')
const request = require('request')

const postThreatMatches = (requestBody) => {
  /* find threats that safe browse suspects */
  var requestUrl = 'https://safebrowsing.googleapis.com/v4/threatMatches:find'
  var options = {
    url: requestUrl,
    body: requestBody,
    json: true,
    qs: { key: process.env.GOOGLE_SAFE_BROWSING_KEY }
  }
  // console.log(`options: ${options}`)
  return new Promise(resolve => {
    request.post(options, (error, response) => {
      // console.log('enter post')
      if (error) {
        // console.log(`error: ${error}`)
        console.log(`status code: ${error}`)
        resolve(error)
      } else if (response.statusCode === 200) {
        console.log(`status code: ${response.statusCode}`)
        // console.log(`response body: ${JSON.stringify(response)}`)
        resolve(response.body)
      } else {
        console.log(`status code: ${response.statusCode}`)
        resolve(response.statusCode)
        // console.log(`response: ${JSON.stringify(response)}`)
      }
    })
  })
}

module.exports = {
  postThreatMatches
}
