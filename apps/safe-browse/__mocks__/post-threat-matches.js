const { response } = require('../test-data/post-threat-matches-data')

const postThreatMatches = () => {
  return new Promise(resolve => {
    console.log('enter mock postThreatMatch')
    if (response.statusCode === 200) {
      resolve(response.body)
    }
  })
}

module.exports = {
  postThreatMatches
}
