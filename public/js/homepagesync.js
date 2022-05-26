const num = 6;

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
  for (var i = 0; i < num; i++) {
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
