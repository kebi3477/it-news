const axios = require("axios");
const cheerio = require("cheerio");
const dataLists = [];

module.exports = app => {
    app.get('/', (req, res) => {
        res.render('index.html');
    });
    app.get('/about', (req, res) => {
        res.render('about.html');
    });
    app.get('/getNewsData', (req, res) => {
        if(dataLists.length === 0) {
            getNewsData().then(result => {
                res.json(dataLists);
            })
        } else {
            res.json(dataLists);
        }
    })
    app.get('/setSession', (req, res) => {
        req.session.log = 'kebi3477';
        req.session.pwd = 'wnddkd1204';
        console.log(req.session)
        //res.json(req.session);
    })
}

function getNewsData() {
    let url = "http://www.itnews.or.kr/?cat=1162";
    let dataList = [];
    return axios.get(url).then(html => {
        const $ = cheerio.load(html.data);
        const $bodyList = $("div.td-item-details");

        $bodyList.each(function(i, elem) {
            dataList[i] = {
                title : $(this).find(".entry-title > a").text(),
                subtitle : $(this).find(".td-excerpt").text(),
                href : $(this).find(".td-read-more > a").attr("href")
            }
        })

        dataList.forEach(json => {
            dataLists.push(json);
        })
    })
}