//const http = require("http");
//const fs = require("fs");
const express = require('express');
const app = express();
const router = require('./router/main')(app);
const port = 8081;


app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
//app.use(express.static('public'));

const server = app.listen(port, () => { //(req, res) => {
    console.log(`Express server has started on ${port}`);
    // fs.readFile('./index.html', (err, data) => {
    //     if(err) {
    //         console.log(err);
    //         ///throw err;
    //     }
    //     //res.end(data);
    // })
})

app.use('/assets',express.static('assets'));

//server.listen(port);
// server.on('listening', () => {
//     console.log(`${port}번 포트에서 서버 대기 중입니다.`)
// })

server.on('error', err => {
    console.log(err);
})