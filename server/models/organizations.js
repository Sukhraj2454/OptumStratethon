const mongoose = require('mongoose');

var OrganizationsSchema = new mongoose.Schema({
  Id:{
    type:String
  },
  NAME:{
    type:String
  },
  ADDRESS:{
    type:String
  },
  CITY:{
    type:String
  },
  STATE:{
    type:String
  },
  ZIP:{
    type:String
  },
  LAT:{
    type:String
  },
  LON:{
    type:String,
  },
  PHONE:{
    type:String
  },
  REVENUE:{
    type:String
  },
  UTILIZATION:{
    type:String
  }
});

var Organizations = mongoose.model('organizations', OrganizationsSchema);
module.exports = {Organizations};
