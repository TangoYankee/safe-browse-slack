'use strict'

const request = require('request')
const oauth = require('../oauth-axios')

describe('oauth successfully recieves an authorization token', () => {
  beforeEach(()=>{
    request.post.mockResolvedValue({ data: "success"})
  })

  it('should be a successful axios call', ()=> {
    expect(oauth()).resolves.toEqual('failure')
    // expect(oauth()).toEqual('failure')
  })
})
