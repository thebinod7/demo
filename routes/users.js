const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Users = require('../model/users');
const bluebird = require('bluebird');
const coroutine = bluebird.coroutine;

const UserService = require('../services/users');

router.post('/signup', coroutine(function* (req, res, next) {
  const payload = req.body
	try {
		const doc = yield UserService.save(payload);
		res.json(doc)
  } catch (e) {
		return next(e);
	}
}));

module.exports = router;
