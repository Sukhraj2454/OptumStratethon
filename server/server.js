require('./config/config'); //config.js to set Environment Variables

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var {Allergy}=require('./models/allergies');
const PORT = process.env.PORT || 3000;

const PATH = path.join(__dirname, '../Main/');
app.use(express.static(PATH));
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({extended:false});

app.get('/', (req, res) => {
    res.sendFile('index.html', ()=>{root:__dirname});
});

app.get('/allergies',  (req, res) => {
  Allergy.find({}, (err, results)=>{
    if(err)
    res.send(err);
    else {
      res.send(results);
    }
  });
});

app.post('/all', urlencodedParser, (req, res)=>{
  console.log(req.body);
  let temp = new Allergy(req.body);
  temp.save().then((ans)=>{
    console.log(temp);

    res.send("Done");
  });
})

server.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`);
});
