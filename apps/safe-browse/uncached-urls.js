'use strict'

const setUncachedUrlDomainKeys = (links) => {
  var uncachedUrlDomainKeys = []
  for (var link of links) {
    if (!link.inCache) {
      uncachedUrlDomainKeys.push(link)
    }
  }
  return uncachedUrlDomainKeys
}

module.exports = {
  setUncachedUrlDomainKeys
}
