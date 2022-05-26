const express = require('express');
const path = require('path');
const cheerio = require("cheerio");
const axios = require("axios");
const fs = require('fs');
const j2cp = require("json2csv").Parser;

const app = express();
const articles = { "title": [],
                   "date": [],
                   "img": [],
                   "article_link": []
                 };

const url = "http://thenoisetier.com/blog/tag/shopping";

async function getTitle() {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    // #iso_grid > div:nth-child(4) > a > div > img
    // #iso_grid > div:nth-child(2) > div.blog_title-date > a > h2
    // #iso_grid > div:nth-child(4) > div.bgi_textWrap.f__2
    // #iso_grid > div:nth-child(3) > div.blog_title-date > div > span.bgi_date.f__b_date-blog.f__3.mod--fs_14
    const tmp = $("#iso_grid div");
    tmp.each(function () {
      title = $(this).find("div.blog_title-date a h2").text();
      date = $(this).find("div.blog_title-date div span.bgi_date.f__b_date-blog.f__3").text().trim();
      img_file = $(this).find("a div img").attr("data-path");
      img_path = $(this).find("a div img").attr("data-file");
      img = "http://" + img_file + "500-" + img_path;
      article_link = $(this).find("div.bgi_fields.readMore a").attr("href");
      if ((article_link != undefined && article_link != "") &&
          (img_file != undefined && img_file != "")) {
        articles.title.push(title);
        articles.article_link.push(article_link);
        articles.date.push(date);
        articles.img.push(img);
      }
    });
    const json_articles = JSON.stringify(articles);
    fs.writeFileSync("../public/data/articles.json", json_articles);
    // const parser = new j2cp();
    // const csv = parser.parse(articles);
    // fs.writeFileSync("../public/data/articles.csv", csv);
  } catch (error) {
    console.error(error);
  }
}
getTitle();

app.use(express.static(
  path.join('/Users/lesyanikolaeva/Desktop/coursework/js',
  '../public')));

app.get('/', (req, res) => {
  res.sendFile(`${'/Users/lesyanikolaeva/Desktop/coursework/js'}/public/index.html`);
});

app.listen(3333, () => {
    console.log('Application listening on port 3333!');
});

// <img
// src="//static-cdn4.vigbo.tech/u36944/49011/blog/3881024/5570804/preview/500-crop--4e12ed1c9c1b58331d0f2de67ad24619.jpeg?v=2"
// class="preview-image "
// data-file="crop--4e12ed1c9c1b58331d0f2de67ad24619.jpeg?v=2"
// data-path="//static-cdn4.vigbo.tech/u36944/49011/blog/3881024/5570804/preview/500-crop--4e12ed1c9c1b58331d0f2de67ad24619.jpeg?v=2"
// data-sizes="{&quot;500&quot;:{&quot;w&quot;:&quot;500&quot;,&quot;h&quot;:&quot;625&quot;},&quot;1000&quot;:{&quot;w&quot;:&quot;750&quot;,&quot;h&quot;:&quot;938&quot;},&quot;2000&quot;:{&quot;w&quot;:&quot;750&quot;,&quot;h&quot;:&quot;938&quot;}}">

//
// var getDeliveryPriceRequest = new XMLHttpRequest();
// getDeliveryPriceRequest.open("GET", url, true);
// getDeliveryPriceRequest.send();
// getDeliveryPriceRequest.onreadystatechange = function() {
//   console.log(getDeliveryPriceRequest.response);
// };
//
//
// // $result = get_web_page( $url );
// //
// // if ( $result['errno'] != 0 ) {
// //   console.log("error: bad url, timeout, redirect loop");
// // }
// //
// // if ( $result['http_code'] != 200 ) {
// //   console.log("no page, no permissions, no service");
// // }
// //
// // $page = $result['content'];
