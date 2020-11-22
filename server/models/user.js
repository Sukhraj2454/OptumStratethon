const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Different Models Imported to access DataBase Collections
var {Allergy} = require('./allergies');
var {Patients} = require('./patients');
var {Conditions} = require('./conditions');
var {Encounters} = require('./encounters');
var {Organizations} = require('./organizations');
var {Providers} = require('./providers');
var {CarePlan} = require('./careplans');
var {Observations} = require('./observations');
var {Procedures} = require('./procedures');

var UserSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    minlength:4,
    validator:{
      validator: validator.isEmail,
      message:'{VALUE} is not a valid Email'
    }
  },
  password:{
    type:String,
    required:true,
    minlength:8
  },
  Id:{
    type:String
  },
  tokens:[{
    access:{
      type:String,
      required:true
    },
    token:{
      type:String,
      required:true
    }
  }]
});

// Method overriding to return only relevant data for less exposure
UserSchema.methods.toJSON = function(){
  var user = this;
  var userObject  = user.toObject();
  return _.pick(userObject, ['Id', 'email']);
}

// To genereate Authentication Token
UserSchema.methods.generateAuthToken = function(){
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id:user._id.toHexString(), access}, process.env.JWT_SECRET).toString();

  user.tokens.push({access, token});

  return user.save().then(()=>{
    return token;
  });
}

// To preprocess the saved password
UserSchema.pre('save', function(next){
  var user = this;

  if(user.isModified('password'))
  {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash)=>{
        user.password= hash;
        next();
      });
    });
  }
  else {
    next();
  }
});

// To find a user by the Authentication token
UserSchema.statics.findByToken = function(token){
  var User = this;
  var decoded;
  try{
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  }catch(e){
    return Promise.reject();
  }
  return User.findOne({
    '_id':decoded._id,
    'tokens.token':token,
    'tokens.access':'auth'
  });
};

// To Login using Credentials
UserSchema.statics.findByCredentials = function(email, password){

  var User = this;
  return User.findOne({email}).then((user)=>{
    if(!user)
      return Promise.reject();

      return new Promise((resolve, reject)=>{
        bcrypt.compare(password, user.password, (err, res)=>{
          if(res)
            resolve(user);
          else reject();
        });
      });
  });
};

// To remove the token when LoggedOut
UserSchema.methods.removeToken = function(token){
  var user = this;
  return user.updateOne({
    $pull:{
      tokens:{token}
    }
  });
};


// Patient methods
UserSchema.methods.patientDetails = function() {
  let user = this;
  return Patients.find({Id:user.Id}, (err, results)=>{
      if(err)
        return Promise.reject();
      else {
        return results;
      }
    });
}

UserSchema.methods.encounters = function() {
  let user = this;

  return Encounters.find({PATIENT:user.Id}).then((data) => data.map((datum) => {
    return ({
      'Org' : datum.ORGANIZATION,
      'Doc' : datum.PROVIDER,
      'Desc': datum.DESCRIPTION,
      'Cost': datum.BASE_ENCOUNTER_COST,
      'Claim':datum.TOTAL_CLAIM_COST,
      'Coverage':datum.PAYER_COVERAGE,
      'reason':datum.REASONDESCRIPTION,
      'start':datum.START,
      'stop':datum.STOP
    })
  }));
}

UserSchema.methods.getOrg = function(Id){
  // let user = this;
  return Organizations.find({Id}).then((data) => data);
}

UserSchema.methods.getDoc = function(Id){
  // let user = this;
  return Providers.find({Id}).then((data) => data);
}

UserSchema.methods.careplan = function(){
  let user = this;

  return CarePlan.find({PATIENT:user.Id}).then((plan) => plan);
}

UserSchema.methods.conditions = function(){
  let user = this;

  return Conditions.find({PATIENT:user.Id}).then((data) => data.map((datum) => {
    return({
      'Start':datum.START,
      'Stop':datum.STOP,
      'Desc':datum.DESCRIPTION,
      'Enc':datum.ENCOUNTER
    });
  }));
}

UserSchema.methods.observations = function(){
  let user = this;

  return Observations.find({PATIENT:user.Id}).then((obs) => obs.map((ob) => {
    return ({
      'date' : ob.DATE,
      'desc' : ob.DESCRIPTION,
      'val' : ob.VALUE,
      'units':ob.UNITS
    })
  }));
}

UserSchema.methods.procedures = function() {
  return Procedures.find({PATIENT:this.Id}).then((pros) => pros);
}
var User = mongoose.model('User', UserSchema);

module.exports = {User};
