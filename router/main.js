const axios = require("axios");
const cheerio = require("cheerio");
const dataLists = [];

const promiseArr = [];

module.exports = app => {
    app.get('/', (req, res) => {
        res.render('index.html');
    });
    app.get('/about', (req, res) => {
        res.render('about.html');
    });
    app.get('/getNewsData', (req, res) => {
        if(dataLists.length === 0) {
            getNewsData();
            Promise.all(promiseArr).then(result => {
                res.json(dataLists);
            })
        } else {
            res.json(dataLists);
        }
    })
    app.get('/setSession', (req, res) => {
        req.session.log = '';
        req.session.pwd = '';
        //res.json(req.session);
    })
}

function getNewsData() {
    const url = {
        "itNews" : "http://www.itnews.or.kr/?cat=1162",
        //"zdnet" : "https://zdnet.co.kr/news/?lstcode=0020&page=1,
        "cio" : "http://www.ciokorea.com/news/",
        "itworld" : "http://www.itworld.co.kr/news/"
    };
    const bodySelector = {
        "itNews" : "div.td-item-details",
        //"zdnet" : "div.newsPost",
        "cio" : "div.list_ ",
        "itworld" : "div.news_list_"
    }
    const titleSelector = {
        "itNews" : ".entry-title > a",
        //"zdnet" : ".assetText > a > h3",
        "cio" : "div:first-child > h4 > a",
        "itworld" : "div:first-child > h4 > a"
    }
    const subtitleSelector = {
        "itNews" : ".td-excerpt",
        //"zdnet" : ".assetText > a > p",
        "cio" : ".fl > .news_body_summary",
        "itworld" : ".fl > .news_body_summary"
    }
    const hrefSelector = {
        "itNews" : ".td-read-more > a",
        //"zdnet" : ".assetText > a",
        "cio" : "div:first-child > h4 > a",
        "itworld" : "div:first-child > h4 > a",
    }
    const imageSelector = {
        "itNews" : ".td-module-image > .td-module-thumb > a > img",
        "cio" : ".list_image > img",
        "itworld" : ".news_list_image > img"
    }

    let dataList = [];
    for(let i in url) {
        promiseArr.push(axios.get(url[i]).then(html => {
            console.log(`getDataUrl : ${url[i]}`);
            const $ = cheerio.load(html.data);
            const $bodyList = $(bodySelector[i]);
            $bodyList.each(function (index, elem) {
                const dataLink = $(this).find(hrefSelector[i]).attr("href");
                const imgSrc = $(this).find(imageSelector[i]).attr("src");
                dataList[index] = {
                    title: $(this).find(titleSelector[i]).text(),
                    subtitle: $(this).find(subtitleSelector[i]).text(),
                    href: dataLink.indexOf("http") > -1 ? dataLink : url[i] + dataLink.split("/")[2],
                    img: i === "cio" || i === "itworld" ? 
                        url[i].slice(0,-6) + imgSrc : ""

                };
                console.log(dataList[index].img)
            });
            dataList.forEach(json => {
                dataLists.push(json);
            });
        })
            .catch(err => {
                if (err.response) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                }
                else if (err.request) {
                    console.log(err.request);
                }
                else {
                    console.log("Error", err.message);
                }
                console.log(err.config);
            }))
    }
}