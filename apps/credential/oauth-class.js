const request = require('request')

// const oauth = () => {
//   return new Promise(resolve, reject)
// }

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


// const oauth = () => {
//   return new Promise((resolve, reject) => {
//     request.post("options", (error, response)  => {
//       if (response) {
//         resolve(response)
//       } else if (error) {
//         resolve(error)
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
