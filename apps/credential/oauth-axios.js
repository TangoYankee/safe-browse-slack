const axios = require('axios')
const request = require('request')

// Actually shows the recieved data
const oauth = () => {
  return new Promise((resolve, reject) => {
    request.post("example.com")
    .then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

// const oauth = () => {
//   var startPromise = postOAuth()
//   startPromise.then(result => {
//     console.log(result)
//     return result
//   }), (err) => {
//     console.error(err)
//     return err
//   }
// }


// const postOAuth = () => {
//   /* find threats that safe browse suspects */
//   var requestUrl = 'https://safebrowsing.googleapis.com/v4/threatMatches:find'
//   // Add timeout of 30s as an option
//   var options = {
//     url: requestUrl,
//     json: true,
//     timeout: 1500,
//     qs: { key: process.env.GOOGLE_SAFE_BROWSING_KEY }
//   }
//   return new Promise((resolve, reject) => {
//     request.post("options", (response)  => {
//       if (!response) {
//         reject('error')
//       } else {
//         resolve(response)
//       }
//     })
//   })
// }

// const oauth = () => {
//   return new Promise((resolve, reject) => {
//     request.post("example.com")
//     .then(response => {
//       resolve(response)
//     })
//   })
// }

// const oauth = async () => {
//   const response = request.post("example.com")
//   return response
//   }


  // .then(response => {
  //   console.log(response)
  // })
  // .catch(response => {
  //   console.log(`error: ${response}`)
  // })
// }

module.exports = oauth
