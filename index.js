'use strict';
const handleToken = require('./tokenHandler');

module.exports = function(app, options) {
  var Role = app.models.Role;

  function handleRole(role, ctx, cb) {
    function reject() {
      process.nextTick(function() {
        cb(null, false);
      });
    }

    const req = ctx.remotingContext.req;

    let token = req.headers.Authorization || req.headers.authorization;

    handleToken(token, cb, reject, role);
  }

  options.roles.forEach(role => {
    Role.registerResolver(role, handleRole);
  })
};
