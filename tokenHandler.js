'use strict';
const jwt = require('jsonwebtoken');

// need to implement the verify function
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

function getPayload(token) {
  const payload = jwt.decode(token);
  return payload;
}

module.exports = (token, resolve, reject, role) => {
  if (token) {
    const split = token.split(' ');

    if (split.length === 2) {
      token = split[1];
    }
  }
  if (token) {
    try {
      const payload = getPayload(token);
      if (payload.user_type == role) {
        resolve(null, true);
      } else {
        reject();
      }
    } catch (err) {
      console.log('error', err);
      reject();
    }
  } else {
    reject();
  }
};
