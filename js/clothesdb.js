const express = require('express');
const path = require('path');
const cheerio = require("cheerio");
const axios = require("axios");
const fs = require('fs');

const app = express();
const items_links = [];

const ush_url = "https://www.ushatava.com/catalog/women/";
const clothes_ush_url = "https://www.ushatava.com";

async function getInfoFromUshatava(url) {
  try {
    const database = [];
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const tmp = $("body main section:nth-child(3) div.container_big div div");
    tmp.each(function () {
      title = $(this).find("a span:nth-child(2) span.section_col.grow h4").text();
      link = $(this).find("a").attr("href");
      img = $(this).find("a div img").attr("data-src");
      price = $(this).find("a span:nth-child(3) span span").text();
      item_link = clothes_ush_url + link;
      if (link != undefined && (title != "" && title != undefined)) {
        var item = {};
        item["title"] = title;
        item["link"] = item_link;
        item["brand"] = "USHATAVA";
        if (img.startsWith("https")) {
          item["img"] = img;
        } else {
          img = clothes_ush_url + img;
        }
        item["img"] = img;
        item["price"] = price;
        database.push(item);
      }
    });
    console.log(database);
    const json_articles = JSON.stringify(database);
    fs.writeFileSync("../public/data/ushatava_db.json", json_articles);
  } catch (error) {
    console.error(error);
  }
}
getInfoFromUshatava(ush_url);

const gate_url = "https://www.gate31.ru/collection/novaya-kollektsiya";
const clothes_gate_url = "https://www.gate31.ru";

async function getInfoFromGate(url) {
  try {
    const database = [];
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const tmp = $("body div.section.section_role_main.section_type_collection div div div.contentBlock div div.row.collection__products div");
    tmp.each(function () {
      title = $(this).find("div a div.product-card__characteristics div.product-card__properties").text().trim();
      link = $(this).find("div a").attr("href");
      img = $(this).find("div a div.product-card__photo img").attr("data-src");
      price = $(this).find("div a div.product-card__info div.product-card__price span").text().trim();
      item_link = clothes_akh_url + link;
      if (link != undefined && (title != "" && title != undefined)) {
        var item = {};
        item["title"] = title;
        item["link"] = item_link;
        item["brand"] = "GATE31";
        item["img"] = img;
        item["price"] = price;
        database.push(item);
      }
    });
    console.log(database);
    const json_articles = JSON.stringify(database);
    fs.writeFileSync("../public/data/gate31_db.json", json_articles);
  } catch (error) {
    console.error(error);
  }
}
getInfoFromGate(gate_url);

const nn_url = "https://www.nnedre.com/collection/new";
const clothes_nn_url = "https://www.nnedre.com";

async function getInfoFromNN(url) {
  try {
    const database = [];
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const tmp = $("body div.page_layout.page_layout_normal_left.page_layout_section_top main div div div div form");
    tmp.each(function () {
      title = $(this).find("div div.product-preview__area-title div a").text().trim();
      link = $(this).find("div div.product-preview__area-title div a").attr("href");
      img = $(this).find("div div.product-preview__area-photo div div.img-ratio.img-ratio_cover div a picture:nth-child(2) img").attr("data-src");
      price = $(this).find("div div.product-preview__area-bottom div.product-preview__price span").text().trim();
      item_link = clothes_nn_url + link;
      if (link != undefined && (title != "" && title != undefined)) {
        var item = {};
        item["title"] = title;
        item["link"] = item_link;
        item["brand"] = "NNEDRE";
        item["img"] = img;
        item["price"] = price;
        database.push(item);
      }
    });
    console.log(database);
    const json_articles = JSON.stringify(database);
    fs.writeFileSync("../public/data/nnedre_db.json", json_articles);
  } catch (error) {
    console.error(error);
  }
}
getInfoFromNN(nn_url);

app.listen(3333, () => {
    console.log('Application listening on port 3333!');
});
