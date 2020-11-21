const mongoose = require('mongoose');

var AllergySchema = new mongoose.Schema({
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

var Allergy = mongoose.model('Allergies', AllergySchema);

module.exports = {Allergy};
