const mongoose = require('mongoose');

var PayerTransSchema = new mongoose.Schema({
  PATIENT:{
    type:String
  },
  START_YEAR:{
    type:String
  },
  END_YEAR:{
    type:String
  },
  PAYER:{
    type:String
  },
  OWNERSHIP:{
    type:String
  }
});

var PayerTrans = mongoose.model('payer_transitions', PayerTransSchema);
module.exports = {PayerTrans};
