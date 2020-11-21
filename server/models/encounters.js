const mongoose = require('mongoose');

var EncounterSchema = new mongoose.Schema({
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
  ORGANIZATION:{
    type:String
  },
  PROVIDER:{
    type:String
  },
  ENCOUNTERCLASS:{
    type:String
  },
  CODE:{
    type:String
  },
  DESCRIPTION:{
    type:String
  },
  BASE_ENCOUNTER_COST:{
    type:String
  },
  TOTAL_CLAIM_COST:{
    type:String
  },
  PAYER_COVERAGE:{
    type:String
  },
  REASONCODE:{
    type:String,
  },
  REASONDESCRIPTION:{
    type:String
  }
});

var Encounters = mongoose.model('encounters', EncounterSchema);
module.exports = {Encounters};
