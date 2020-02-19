'use strict'

const request = {
    post: jest.fn(() => Promise.resolve ({ 
      body: {}
    })
    )
  }

module.exports = {
  request
}
