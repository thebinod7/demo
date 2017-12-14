const express = require('express');
const router = express.Router();
// const siteAuthor = require('../utils/middleware');

router.get('/', (req,res) => {
      res.render('index');
});

module.exports = router;
