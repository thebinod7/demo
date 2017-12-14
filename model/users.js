const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Users = new Schema({
  username: String,
  password: String,
  extras: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
  isActive: {type: Boolean, default: true}
});

module.exports =  mongoose.model('Users', Users);
