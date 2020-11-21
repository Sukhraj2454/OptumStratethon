const mongoose = require('mongoose');

var CarePlanSchema = new mongoose.Schema({
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
  },
  REASONCODE:{
    type:String,
  },
  REASONDESCRIPTION:{
    type:String
  }
});

var CarePlan = mongoose.model('careplans', CarePlanSchema);
module.exports = {CarePlan};
