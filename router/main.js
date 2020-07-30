//const dataList = require("../util/crolling");

const axios = require("axios");
const cheerio = require("cheerio");
const dataLists = [];

module.exports = app => {
    app.get('/', (req, res) => {
        res.render('index.html');
        // getNewsData().then(result => {
        //     //res.json(dataLists);
        //     res.render('index.html');
        // })
    });
    app.get('/about', (req, res) => {
        res.render('about.html');
    });
    app.get('/getNewsData', (req, res) => {
        console.log(dataLists);
        getNewsData().then(result => {
            res.json(dataLists);
            //res.render('index.html');
        })
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