const express = require('express');
const router = express.Router();
// const siteAuthor = require('../utils/middleware');

router.get('/', (req,res) => {
      res.render('index');
});

router.get('/hello', (req,res) => {
      res.render('hello');
});

module.exports = router;
