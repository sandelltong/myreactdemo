var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/userModel')
const config = require('./config/config.js');

require("dotenv").config({
 path: path.join(__dirname, "../.env")
});

var { createLogger, transports ,format} = require('winston');
var logger = createLogger({
    level: 'info',
    format: format.combine(
      format.json(),
      format.timestamp()
  ),
  transports: [
    new transports.File({ filename: 'error.log', level: 'info' })
  ]
});

var incidentssRouter = require('./routes/incidents');
var  usersRouter = require('./routes/users.js');

var app = express();

console.log(global.gConfig.database);
var dbRoute = global.gConfig.database;
mongoose.connect(dbRoute, { useNewUrlParser: true , useUnifiedTopology: true});
let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/incidents', incidentssRouter);
app.use('/api/users', usersRouter);

app.use(async (req, res, next) => {
  if (req.headers["x-access-token"]) {
    const accessToken = req.headers["x-access-token"];
    const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
    // Check if token has expired
    if (exp < Date.now().valueOf() / 1000) { 
      return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
    } 
    res.locals.loggedInUser = await User.findById(userId); 
    next(); 
  } else { 
    next(); 
  } 
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  })
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
