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
  var mainContainer = document.getElementById("blog-section");
  for (var i = 0; i < data.title.length; i++) {
      var div = document.createElement("div");
      div.className = "blog-page-card";

      var div_img = document.createElement("div");
      div_img.className = "blog-img";
      var image = document.createElement("img");
      image.src = data.img[i];
      div_img.appendChild(image);

      var div_header = document.createElement("div");
      div_header.className = "blog-header";
      var header_ = document.createElement("h2");
      var header = document.createElement("a");
      header.innerHTML = data.title[i];
      header.href = data.article_link[i];
      header_.appendChild(header);
      div_header.appendChild(header_);

      var div_source = document.createElement("div");
      div_source.className = "blog-source";
      var source = document.createElement("a");
      source.innerHTML = data.source[i];
      source.href = data.article_link[i];
      div_source.appendChild(source);

      var div_date = document.createElement("div");
      div_date.className = "blog-date-info";
      var date = document.createElement("p");
      date.innerHTML = data.date[i];
      div_date.appendChild(date);

      div.appendChild(div_img);
      div.appendChild(div_header);
      div.appendChild(div_source);
      div.appendChild(div_date);
      mainContainer.appendChild(div);
  }
}
