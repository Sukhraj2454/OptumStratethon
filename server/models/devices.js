const mongoose = require('mongoose');

var DevicesSchema = new mongoose.Schema({
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
  },
  UDI:{
    type:String,
  }
});

var Devices = mongoose.model('devices', DevicesSchema);
module.exports = {Devices};
