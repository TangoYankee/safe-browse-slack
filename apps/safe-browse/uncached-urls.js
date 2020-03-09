'use strict'

const setUncachedUrlDomainKeys = (links) => {
  var uncachedUrlDomainKeys = []
  for (var link of links) {
    if (!link.inCache) {
      uncachedUrlDomainKeys.push(link.urlDomainKey)
    }
  }
  return uncachedUrlDomainKeys
}

module.exports = {
  setUncachedUrlDomainKeys
}
