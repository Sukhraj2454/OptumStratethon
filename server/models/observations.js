const mongoose = require('mongoose');

var ObservationsSchema = new mongoose.Schema({
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
  VALUE:{
    type:String,
  },
  UNITS:{
    type:String
  },
  TYPE:{
    type:String
  }
});

var Observations = mongoose.model('observations', ObservationsSchema);
module.exports = {Observations};
