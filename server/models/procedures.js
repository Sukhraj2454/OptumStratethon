const mongoose = require('mongoose');

var ProceduresSchema = new mongoose.Schema({
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
    type:String
  },
  REASONCODE:{
    type:String,
  },
  REASONDESCRIPTION:{
    type:String
  }
});

var Procedures = mongoose.model('procedures', ProceduresSchema);
module.exports = {Procedures};
