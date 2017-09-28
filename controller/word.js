var mongoose = require('mongoose');
var WordModel = require('../model/ecdict.js');

var controller = {};
controller.index = function (req, res, next) {
  console.log('req.query',req.query);
  console.log('req.body',req.body);
  
  var word = req.query.word;
  word = word.toLowerCase();
  // console.log('word', word);

  WordModel.findOne({
    word: word
  }, function (err, doc) {
    if (err) {
      console.log('err', err);
      next();
    }

    if (doc && doc.translation) {
      // console.log('doc.translation',doc.translation);
      res.json(doc);
    } else {
      res.send('not found');
    }

  });
};

module.exports = controller;