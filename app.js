const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const helpers = require('./helpers');

mongoose.Promise = global.Promise;

require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE);
mongoose.connection.on('error', (err) => {
  console.log(err.message);
});

var users = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//Body parser middleware
// parse application/x-www-form-urlencoded.

function hello(req,res,next){
  res.write('Hello \n');
  next();
}

app.use(logger('dev'));
app.use(expressLayouts);
app.set('layout', 'layouts/default');
app.set('layout extractScripts', true);

app.use(cookieParser());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

// ROUTES FOR OUR API
app.use('/', require('./routes'));
app.use('/users', users);
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  if(process.env.NODE_ENV === 'dev'){
    next(err);
  } else {
    res.render('errors/404');
  }
});

// error handler
app.use(function(err, req, res, next) {
  console.log(process.env.NODE_ENV);
  if(process.env.NODE_ENV === 'dev'){
    res.locals.error = err;
    res.status(err.status || 500);
    res.render('errors/error');
  } else {
    res.render('errors/5xx');
  }
});


//Start server
app.listen(process.env.PORT,function () {
    console.log('Server running at port:' + process.env.PORT);
});
