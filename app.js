const express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const helpers = require('./helpers');

require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.log(err.message);
});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//Body parser middleware
// parse application/x-www-form-urlencoded.

app.use(expressLayouts);
app.set('layout', 'layouts/default');
app.set('layout extractScripts', true);

app.use(cookieParser());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

// app.use((req,res,next) => {
//   console.log('Helpers:',helpers);
//   res.locals.h = helpers;
//   next;
// });


// ROUTES FOR OUR API
app.use('/', require('./routes'));
app.use(express.static(path.join(__dirname, 'public')));

//Start server
app.listen(process.env.PORT,function () {
    console.log('Server running at port:' + process.env.PORT);
});
