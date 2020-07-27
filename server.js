const http = require("http");
const fs = require("fs");
const port = 8081;

const server = http.createServer((req, res) => {
    fs.readFile('./index.html', (err, data) => {
        if(err) {
            throw err;
        }
        res.end(data);
    })
})
server.listen(port);
server.on('listening', () => {
    console.log(`${port}번 포트에서 서버 대기 중입니다.`)
})
server.on('error', err => {
    console.log(err);
})