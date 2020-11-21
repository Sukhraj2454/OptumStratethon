const mongoose = require('mongoose');

var ImagingSchema = new mongoose.Schema({
  Id:{
    type:String
  },
  DATE:{
    type:String
  },
  PATIENT:{
    type:String
  },
  ENCOUNTER:{
    type:String
  },
  BODYSITE_CODE:{
    type:String
  },
  BODYSITE_DESCRIPTION:{
    type:String
  },
  MODULARITY_CODE:{
    type:String,
  },
  MODULARITY_DESCRIPTION:{
    type:String
  },
  SOP_CODE:{
    type:String
  },
  SOP_DESCRIPTION:{
    type:String
  }
});

var Imaging = mongoose.model('imaging_studies', ImagingSchema);
module.exports = {Imaging};
