const mongoose = require('mongoose');

var ConditionsSchema = new mongoose.Schema({
  Id:{
    type:String
  },
  START:{
    type:String
  },
  STOP:{
    type:String
  },
  PATIENT:{
    type:String
  },
  ENCOUNTER:{
    type:String
  },
  CODE:{
    type:String
  },
  DESCRIPTION:{
    type:String
  }
});

var Conditions = mongoose.model('conditions', ConditionsSchema);
module.exports = {Conditions};
