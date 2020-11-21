const mongoose = require('mongoose');

var MedicationsSchema = new mongoose.Schema({
  START:{
    type:String
  },
  STOP:{
    type:String
  },
  PATIENT:{
    type:String
  },
  PAYER:{
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
  BASE_COST:{
    type:String
  },
  PAYER_COVERAGE:{
    type:String
  },
  DISPENSES:{
    type:String
  },
  TOTAL_COST:{
    type:String
  },
  REASONCODE:{
    type:String,
  },
  REASONDESCRIPTION:{
    type:String
  }
});

var Medications = mongoose.model('medications', MedicationsSchema);
module.exports = {Medications};
