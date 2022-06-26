const BLOGS_NUMBER = 6;
const IMAGES_NUMBER = 6;
const BRANDS_NUMBER = 3;
const QUIZZES_NUMBER = 6;

fetch('../data/articles.json')
  .then(function (response) {
      return response.json();
  })
  .then(function (data) {
      appendData(data);
  })
  .catch(function (err) {
      console.log('error: ' + err);
  });

function appendData(data) {
  var mainContainer = document.getElementById("article-row");
  for (var i = 0; i < BLOGS_NUMBER; i++) {
      var div = document.createElement("div");
      div.className = "article-column";

      var div_img = document.createElement("div");
      div_img.className = "article-card";
      var image = document.createElement("img");
      image.src = data.img[i];
      div_img.appendChild(image);

      var div_header = document.createElement("div");
      div_header.className = "article-header";
      var header_ = document.createElement("h2");
      var header = document.createElement("a");
      header.innerHTML = data.title[i];
      header.href = data.article_link[i];
      header_.appendChild(header);
      div_header.appendChild(header_);

      div.appendChild(div_img);
      div.appendChild(div_header);
      mainContainer.appendChild(div);
  }
}

const brands = DATA.map(({ brand }) => brand);
const images = DATA.map(({ img }) => img);
const img_links = DATA.map(({ link }) => link);
let uniqueBrands = [...new Set(brands)];

const titles = DATA_QUIZZES.map(({ title }) => title);
const links = DATA_QUIZZES.map(({ link }) => link);


function appendBrands(brands) {
  var mainContainer = document.getElementById("brand-link-row");
  for (var i = 0; i < BRANDS_NUMBER; i++) {
      var a = document.createElement("a");
      a.className = "link-title";
      a.innerHTML = brands[i];

      mainContainer.appendChild(a);
  }
}
appendBrands(uniqueBrands);

function appendQuizzes(titles, links) {
  var mainContainer = document.getElementById("quiz-link-row");
  for (var i = 0; i < QUIZZES_NUMBER; i++) {
      var a = document.createElement("a");
      a.className = "link-title";
      a.innerHTML = titles[i];
      a.href = links[i];

      mainContainer.appendChild(a);
  }
}
appendQuizzes(titles, links);

function appendImages(images, links) {
  var mainContainer = document.getElementById("item-row");
  for (var i = 0; i < IMAGES_NUMBER; i++) {
    var div = document.createElement("div");
    div.className = "item-column";

    var a = document.createElement("a");
    a.href = links[i];

    var div_img = document.createElement("div");
    div_img.className = "item-card";
    var image = document.createElement("img");
    image.src = images[i];

    a.appendChild(image);
    div_img.appendChild(a);
    div.appendChild(div_img);
    mainContainer.appendChild(div);
  }
}
appendImages(images, img_links);
