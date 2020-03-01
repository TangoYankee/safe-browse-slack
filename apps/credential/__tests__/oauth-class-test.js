'use strict'

const request = require('request')
const oauth = require('../oauth-class')

describe('oauth successfully recieves an authorization token', () => {
  beforeEach(()=>{
    request.post.mockResolvedValue({ data: "success"})
  })

  // it('should be a failed request call', ()=> {
  //   expect.assertions(1)
  //   expect(oauth()).rejects.toEqual('error')
  // })

  it('should be a successful axios call', ()=> {
    expect.hasAssertions()
    return expect(oauth()).resolves.toEqual({ data: "failure"})
  })
})
