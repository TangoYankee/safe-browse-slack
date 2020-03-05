'use strict'

const { mockTokenRequest } = require('../apps/credential/test-data/oauth-data')

const request = jest.genMockFromModule('request')
// const post = (options) => new Promise((resolve, reject) => {
//   resolve(mockTokenRequest)
// })  

// request.post = post

module.exports = request
