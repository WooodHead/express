var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EcdictSchema = new Schema({
  word: String,
  definition: String,
  translation:String,
  phonetic:String,
  tag:String,
  oxford:String
});

var Ecdict = mongoose.model('ecdict', EcdictSchema);
module.exports = Ecdict;