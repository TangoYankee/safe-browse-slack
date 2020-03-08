'use strict'

const { messageData } = require('../unchached-urls-data/hypertexts')
const { setUncachedUrlDomainKeys } = require('../uncached-urls')

describe('list of urls that are not already chached', () => {
  it('should take list of six url objects and return list of only four uncached urls', () => {
    expect(setUncachedUrlDomainKeys(messageData.links).length).toEqual(4)
  })
})
