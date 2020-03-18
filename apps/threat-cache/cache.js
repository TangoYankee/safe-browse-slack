'use strict'

const NodeCache = require('node-cache')
let cache = null

const cacheStart = (done) => {
  /* initialize */
  if (cache) {
    return done
  }
  cache = new NodeCache()
}

const cacheInstance = () => {
  /* share */
  return cache
}

module.exports = {
  cacheStart,
  cacheInstance
}
