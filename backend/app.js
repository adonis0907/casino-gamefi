var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
var dotenv = require('dotenv');

var DBConfig = require('./config/database');
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();

// Database Connection

mongoose.connect(
  `mongodb+srv://${ DBConfig.devServer.username }:${ DBConfig.devServer.password }@${ DBConfig.devServer.cluser }.mongodb.net/${ DBConfig.devServer.database }?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    //useFindAndModify: false,
    useUnifiedTopology: true
  }
)

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected to Cloud MongoDB Server Successfully!");
});

dotenv.config();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/build')));
app.use(cors());

//app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use('/*', function(req, res, next) {
  //next(createError(404));
  res.sendFile(path.join(__dirname, '/build', 'index.html'));
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
