var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var fs = require('fs');
var path = require('path');

var index = require('./routes/index');
var users = require('./routes/users');

var wordController = require('./controller/word.js');

var serveIndex = require('serve-index')

const models = path.join(__dirname, 'app/models');
const port = process.env.PORT || 8080;
const app = express();


app.use(express.static("public"));

app.use('/ftp', serveIndex(__dirname + '/public/ftp', {
  'icons': true,
  "view": "details"
}))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost/words');

app.use('/', index);
app.use('/users', users);


function getWordsList(text) {
  var words = [];

  words = text.split(/\s+/g)
    .map(function (w) {
      return w.trim().replace(/[^’.0-9a-zA-Z-]/g, '');
    })
    .filter(function (w) {
      return w !== "" && !/^.{1,2}$/g.test(w);
    })
    //remove duplicate
    .filter(function (val, index, arr) {
      return arr.indexOf(val) === index;
    })
    .sort();

  return words;
}

var greList = [];

function readGre() {
  fs.readFile(path.join(__dirname, '/words/to-highlight.txt'), 'utf-8',
    function (err, data) {
      greList = data.split('\n');
      // console.log('greList', greList);
    });
}

readGre();

app.get("/sentences", function (req, res, next) {

  var text = req.query.data;

  var words = getWordsList(text);

  var result = words.filter(function (ele) {
    return greList.indexOf(ele) > 0;
  });

  res.send(JSON.stringify(result));
  res.render();
});

app.post("/sentences", function (req, res, next) {
  var content = req.body.content;
  // console.log('content',content);
  var words = getWordsList(content);

  var result = words.filter(function (ele) {
    return greList.indexOf(ele) > 0;
  });

  res.json(result);

});


app.post("/links", function (req, res, next) {
  // console.log('JSON.parse(req.body)', JSON.parse(req.body));

  var body = req.body;
  // console.log('body', body);

  var urlArr = req.body.urlarr;
  var textArr = req.body.textarr;

  var content = textArr.join(' ');
  var words = getWordsList(content);

  var result = words.filter(function (ele) {
    return greList.indexOf(ele) > 0;
  });

  result.push('donate');
  result.push('plugins');

  res.json(result);

});


app.post("/images", function (req, res, next) {
  // console.log('JSON.parse(req.body)', JSON.parse(req.body));

  var body = req.body;
  var url = req.body.url;
  res.send(url);

});


app.get("/definition", wordController.index);

app.get("/links", function (req, res, next) {

  // var linksArray = req.query.data;
  // console.log('linksArray',linksArray);
  var ret = 'donate';
  res.json(['donate']);

});

app.get("/test", function (req, res, next) {
  // console.log('-----test');
  res.send('test');
});

app.get("/img", function (req, res) {
  var url = req.query.url;
  res.send(url);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;