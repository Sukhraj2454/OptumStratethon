const mongoose = require('mongoose');

var ProvidersSchema = new mongoose.Schema({
  Id:{
    type:String
  },
  ORGANIZATION:{
    type:String
  },
  NAME:{
    type:String
  },
  GENDER:{
    type:String
  },
  SPECIALITY:{
    type:String
  },
  ADDRESS:{
    type:String
  },
  CITY:{
    type:String
  },
  STATE:{
    type:String,
  },
  ZIP:{
    type:String
  },
  LAT:{
    type:String
  },
  LON:{
    type:String
  },
  UTILIZATION:{
    type:String
  }
});

var Providers = mongoose.model('providers', ProvidersSchema);
module.exports = {Providers};
