const express = require('express');
const path = require('path');
const cheerio = require("cheerio");
const axios = require("axios");
const fs = require('fs');

const app = express();
const articles = { "title": [],
                   "date": [],
                   "img": [],
                   "source": [],
                   "article_link": []
                 };

const url = "http://thenoisetier.com/blog/tag/shopping";

async function getInfoFromTheNoisetier(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const tmp = $("#iso_grid div");
    tmp.each(function () {
      title = $(this).find("div.blog_title-date a h2").text();
      date = $(this)
        .find("div.blog_title-date div span.bgi_date.f__b_date-blog.f__3")
        .text()
        .trim();
      img_file = $(this).find("a div img").attr("data-path");
      img_path = $(this).find("a div img").attr("data-file");
      img = "http://" + img_file + "500-" + img_path;
      article_link = $(this).find("div.bgi_fields.readMore a").attr("href");
      if ((article_link != undefined && article_link != "") &&
          (img_file != undefined && img_file != "")) {
        articles.title.push(title);
        articles.article_link.push(article_link);
        articles.source.push("The Noisetier");
        articles.date.push(date);
        articles.img.push(img);
      }
    });
    const json_articles = JSON.stringify(articles);
    fs.writeFileSync("../public/data/articles.json", json_articles);
  } catch (error) {
    console.error(error);
  }
}

getInfoFromTheNoisetier(url);

app.use(express.static(
  path.join('/Users/lesyanikolaeva/Desktop/coursework/js',
  '../public')));

app.get('/', (req, res) => {
  res.sendFile(`${'/Users/lesyanikolaeva/Desktop/coursework/js'}/public/index.html`);
});

app.listen(3333, () => {
    console.log('Application listening on port 3333!');
});
