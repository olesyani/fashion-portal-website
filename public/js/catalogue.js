var min_price = 0;
var max_price = 250000;

const clothes = {
  "blouse" : ["рубашк", "блуз"],
  "bodysuit": ["боди"],
  "trousers" : ["брюки", "штаны"],
  "outwear": ["куртк", "плащ", "пальто", "тренч", "бомбер"],
  "knit": ["жилет", "свитер"],
  "jeans": ["джинсы"],
  "homewear": ["пижам", "пижамные"],
  "jumpsuit": ["комбинезон"],
  "suit": ["костюм", "комплект"],
  "socks": ["носки", "колготки"],
  "jacket": ["пиджак", "жакет"],
  "dress": ["платье"],
  "bag": ["сумка", "шоппер"],
  "sweatshirt": ["толстовка", "худи"],
  "top": ["топ", "майк", "футболк", "бра"],
  "shorts": ["шорт", "бермуд"],
  "skirt": ["юбк"]
}

const clothes_by_season = {
  "blouse" : ["spring", "summer", "autumn"],
  "bodysuit": ["spring", "summer", "autumn"],
  "trousers" : ["spring", "summer", "autumn", "winter"],
  "outwear": ["spring", "autumn", "winter"],
  "knit": ["autumn", "winter"],
  "jeans": ["spring", "summer", "autumn", "winter"],
  "homewear": ["spring", "summer", "autumn", "winter"],
  "jumpsuit": ["spring", "summer", "autumn"],
  "suit": ["spring", "summer", "autumn", "winter"],
  "socks": ["spring", "summer", "autumn", "winter"],
  "jacket": ["spring", "summer", "autumn", "winter"],
  "dress": ["spring", "summer", "autumn"],
  "bag": ["spring", "summer", "autumn", "winter"],
  "sweatshirt": ["autumn", "winter", "spring"],
  "top": ["spring", "summer", "autumn"],
  "shorts": ["summer"],
  "skirt": ["summer"]
}

var values = $.map(clothes, function(value, key) { return value });

$(function() {
	$( "#slider-range" ).slider({
	  range: true,
	  min: 0,
	  max: 250000,
	  values: [ 0, 250000 ],
	  slide: function( event, ui ) {
		$( "#amount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] + " руб." );
    min_price = ui.values[ 0 ];
    max_price = ui.values[ 1 ];
    filterGoods()
	  }
	});
	$( "#amount" ).val( $( "#slider-range" ).slider( "values", 0 ) +
	   " - "  + $( "#slider-range" ).slider( "values", 1 ) + " руб." );
});

function byStyle() {
  document.getElementById("by-season-options").style.display = "none";
  document.getElementById("by-style-options").style.display = "block";
  document.getElementById("style").className = "active";
  document.getElementById("season").className = "";
}

function bySeason() {
  document.getElementById("by-style-options").style.display = "none";
  document.getElementById("by-season-options").style.display = "block";
  document.getElementById("style").className = "";
  document.getElementById("season").className = "active";
}

var filter_in_use = "";

function filterInUse(e) {
  var current = document.getElementsByClassName("btn active");
  current[0].className = current[0].className.replace(" active", "");
  e.className += " active";
  filter_in_use = e.getAttribute("data-filter");
  filterGoods();
}

const filters = document.getElementById("f-section");
filters.addEventListener("input", filterGoods);

function filterGoods() {
  const brands = document.getElementById("brands").value;
  const categories = document.getElementById("categories").value;
  const colors = document.getElementById("colors").value;
  const priceMin = min_price;
  const priceMax = max_price;

  outputGoods(
    DATA.filter(
      (n) =>
        (n.season.includes(filter_in_use)) &&
        (!brands || n.brand == brands) &&
        (!colors || n.color == colors) &&
        (!categories || n.category.includes(categories)) &&
        (!priceMin || priceMin <= n.price.replace(" ", "")) &&
        (!priceMax || priceMax >= n.price.replace(" ", ""))
    )
  );
}

function outputGoods(goods) {
  document.getElementById("products-container").innerHTML = goods
    .map((n) => `
      <div class="product-card">
        <div class="product-image">
          <img src="${n.img}" class="product-image">
        </div>
        <div class="product-details">
          <a href="${n.link}">
            <h3 class="product-name">${n.brand}</h3>
            <h2 class="product-name">${n.title}</h2>
          </a>
          <p class="product-cost">${n.price}</p>
        </div>
      </div>
  `
    ).join("");
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key].includes(value));
}

function category(item) {
  Array.prototype.forEach.call(values, i => {
    if (item.title.toLowerCase().includes(i)) {
      item.category.push(getKeyByValue(clothes, i));
    }
  });
  Array.prototype.forEach.call(item.category, i => {
    item.season.push(...clothes_by_season[i]);
  });
  item.season.push("");
}

function setCategories(goods) {
  goods.map(category);
}

outputGoods(DATA);
setCategories(DATA);
