'use strict';
const Crypto = require('crypto');
module.exports = {
  cacheKey(method, path, query) {
    const keyString = method + path + JSON.stringify(query);
    const md5CacheKey = Crypto
      .createHash('md5')
      .update(keyString)
      .digest('base64');
    return md5CacheKey;
  },
};
