const { response } = require('../test-data/post-threat-matches-data')

const postThreatMatches = () => {
  console.log('enter mock postThreatMatch')
  return new Promise(resolve => {
    if (response.statusCode === 200) {
      resolve(response.body)
    }
  })
}

module.exports = {
  postThreatMatches
}
