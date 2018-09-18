'use strict';
const handleToken = require('./tokenHandler');

module.exports = function(app, options) {
  var Role = app.models.Role;
  const JWT_PRIVATE_KEY = (options && options.private_key_name) ?
  process.env[options.private_key_name] : process.env.JWT_PRIVATE_KEY;

  const roleAttName = (options && options.tokenAttName) ?
  options.tokenAttName : 'user_type';

  function handleRole(role, ctx, cb) {
    function reject() {
      process.nextTick(function() {
        cb(null, false);
      });
    }

    const req = ctx.remotingContext.req;

    let token = req.headers.Authorization || req.headers.authorization;

    handleToken(token, cb, reject, role, JWT_PRIVATE_KEY, roleAttName);
  }

  if (options.roles) {
    options.roles.forEach(role => {
      Role.registerResolver(role, handleRole);
    });
  } else {
    throw new Error('You need to declare the roles in the component config.');
  }
};
