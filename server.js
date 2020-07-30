const express = require('express');
const app = express();
const router = require('./router/main')(app);
const port = 8081;


app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use('/assets', express.static('assets'));

const server = app.listen(port, () => {
    console.log(`Express server has started on ${port}`);
})

server.on('error', err => {
    console.log(err);
})