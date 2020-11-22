require('./config/config'); //config.js to set Environment Variables of the application

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
var {authenticate} = require('./middleware/authenticate');

var {User} = require('./models/user')
var app = express();
var server = http.createServer(app);
// Socket.io for real time communication
var io = socketIO(server);

const PORT = process.env.PORT || 3000;

const PATH = path.join(__dirname, '../Main/');
app.use(express.static(PATH));
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({extended:false});

app.get('/', (req, res) => {
    res.sendFile('home.html');
});

// SigningUp or registering User
app.post('/signup', urlencodedParser, (req, res)=>{
  var body = req.body;
  var user = new User(body);
  user.save().then((usr)=>{
    if(usr.desig === 'Seller'){
    return user.generateVId().then(()=>{
      res.status(200).send(user);
    });}
    else {
      res.status(200).send(usr);
    }
  }).catch((e)=>{
    res.status(400).send(e);
  });
});

// LoggingIn
app.post('/login', urlencodedParser, (req, res)=>{
  var body = req.body;
  User.findByCredentials(body.email, body.password).then((user)=>{
    user.generateAuthToken().then((token)=>{
      res.header('x-auth', token).status(200).send(user);
    });
  }).catch((e)=>{
    res.status(401).send('Error'+e);
  })
});

// get user
app.get('/login/user', authenticate, (req, res)=>{
res.status(200).send(req.user);
});

// logging Out
app.delete('/logout', authenticate, (req, res)=>{
  req.user.removeToken(req.token).then(()=>{
    res.status(200).send('Logged Out');
  },(e)=>{
    res.status(401).send(e);
  });
});

// Patient Records
app.get('/patient', authenticate, (req, res) => {
  req.user.patientDetails().then((det) => {
    res.status(200).send(det);
  });
});

// Patient encounters
app.get('/encounters', authenticate, (req, res) => {
  req.user.encounters().then((data) => {
    res.status(200).send(data);
  })
});

// Recommended organization in past
app.get('/organization/:Id', authenticate, (req, res) => {

  let Id = req.params['Id'];
  req.user.getOrg(Id).then((data) => res.status(200).send(data));
});

// Recommended Doctor in past
app.get('/provider/:Id', authenticate, (req, res) => {

  let Id = req.params['Id'];
  req.user.getDoc(Id).then((data) => res.status(200).send(data));
});

// Care plan suggested for you
app.get('/careplans', authenticate, (req, res) => {

  req.user.careplan().then((plan) => res.send(plan));
});

// Conditions of patient
app.get('/conditions', authenticate, (req, res) => {
  req.user.conditions().then((data) => res.send(data));
});

//observations from devices
app.get('/observations', authenticate, (req, res) => {
  req.user.observations().then((data) => res.send(data));
});
// Procedures
app.get('/procedures', authenticate, (req, res) => {
  req.user.procedures().then((data) => res.send(data));
});

// Medications
app.get('/medications', authenticate, (req, res) => {
  req.user.medications().then((data) => res.send(data));
});
// Devices
app.get('/devices', authenticate, (req, res) => {
  req.user.devices().then((data) => res.send(data));
});
// Allergies
app.get('/allergies', authenticate, (req, res) => {
  req.user.allergies().then((data) => res.send(data));
});
server.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`);
});
