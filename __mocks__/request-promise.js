'use strict'

// const { mockTokenRequest } = require('../apps/credential/test-data/oauth-data')

const requestPromise = jest.genMockFromModule('request-promise')
// const post = (options) => new Promise((resolve, reject) => {
//   resolve(mockTokenRequest)
// })

// request.post = post

module.exports = requestPromise
