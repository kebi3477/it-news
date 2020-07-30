const axios = require("axios");
const cheerio = require("cheerio");

module.exports = app => {
    app.get('/', (req, res) => {
        let url = "http://www.itnews.or.kr/?cat=1162";
        let dataList = [];

        axios.get(url).then(html => {
            const $ = cheerio.load(html.data);
            const $bodyList = $("div.td-item-details");

            $bodyList.each(function(i, elem) {
                dataList[i] = {
                    title : $(this).find(".entry-title > a").text(),
                    subtitle : $(this).find(".td-excerpt").text()
                }
            })
            //console.log(dataList);
        })
        res.render('dataList', dataList);
        //res.render('index.html');
    });
    app.get('/about', (req, res) => {
        res.render('about.html');
    });
}