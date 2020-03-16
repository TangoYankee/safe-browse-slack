'use strict'

const setUncachedUrlDomainKeys = (links) => {
  /* filter urls that are not already in cache */
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
