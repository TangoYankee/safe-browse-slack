const { response } = require('../test-data/post-threat-matches-data')

const postThreatMatches = () => {
  console.log(`enter mock`)
  return new Promise(resolve => {
    console.log('enter promise')
    if (response.statusCode === 200) {
      console.log(`enter response, code: ${response.statusCode}`)
      resolve(response.body)
    }
  })
}

module.exports = {
  postThreatMatches
}
