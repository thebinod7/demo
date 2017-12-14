const coroutine = require('bluebird').coroutine;

const UserModel = require('../model/users.js');

const save = coroutine(function*(payload) {
  const users = new UserModel(payload);
  return yield users.save();
});

module.exports = {
  save
};
