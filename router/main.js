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
        "cio" : "http://www.ciokorea.com/news/"
    };
    const bodySelector = {
        "itNews" : "div.td-item-details",
        //"zdnet" : "div.newsPost",
        "cio" : "div.list_ "
    }
    const titleSelector = {
        "itNews" : ".entry-title > a",
        //"zdnet" : ".assetText > a > h3",
        "cio" : "div:first-child > h4 > a"
    }
    const subtitleSelector = {
        "itNews" : ".td-excerpt",
        //"zdnet" : ".assetText > a > p",
        "cio" : ".news_list_has_thumb_size > .news_body_summary"
    }
    const hrefSelector = {
        "itNews" : ".td-read-more > a",
        //"zdnet" : ".assetText > a",
        "cio" : "div:first-child > h4 > a"
    }
    
    let dataList = [];
    for(let i in url) {
        promiseArr.push(axios.get(url[i]).then(html => {
            console.log(`url : ${url[i]}`);
            const $ = cheerio.load(html.data);
            const $bodyList = $(bodySelector[i]);
            $bodyList.each(function (index, elem) {
                const dataLink = $(this).find(hrefSelector[i]).attr("href");
                dataList[index] = {
                    title: $(this).find(titleSelector[i]).text(),
                    subtitle: $(this).find(subtitleSelector[i]).text(),
                    href: dataLink.indexOf("http") > -1 ? dataLink : url[i] + dataLink.split("/")[2]
                };
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