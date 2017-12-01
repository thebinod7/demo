const express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

//const apiCategory = require('./routes/category');
const port = 1221;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//Body parser middleware
// parse application/x-www-form-urlencoded.

app.use(cookieParser());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));


// ROUTES FOR OUR API
app.use('/', require('./routes'));
app.use(express.static(path.join(__dirname, 'public')));

//Start server
app.listen(port,function () {
    console.log('Server running at port:' + port);
});
