const express = require('express');
const path = require('path');
const app = express();


const PATH = path.join(__dirname, '../Main/');
app.use(express.static(PATH));

app.get('/', (req, res) => {
    res.sendFile('index.html', ()=>{root:__dirname});
})

app.listen(5000, () => {
    console.log('server is listening on 5000');
})