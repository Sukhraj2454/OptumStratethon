const mongoose = require('mongoose');

var ImmunizationsSchema = new mongoose.Schema({
  DATE:{
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
  BASE_COST:{
    type:String,
  }
});

var Immunization = mongoose.model('immunizations', ImmunizationsSchema);
module.exports = {Immunization};
