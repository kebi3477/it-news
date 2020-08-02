const express = require('express');
const session = require('express-session');
const app = express();
const port = 8081;
let router = "";

app.use(session({
    secret: '12fasdfasd1233asdsadasd',
    resave: true,
    saveUninitialized: true,
}))

router = require('./router/main')(app);
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