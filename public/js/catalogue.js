$(function() {
	$( "#slider-range" ).slider({
	  range: true,
	  min: 0,
	  max: 250000,
	  values: [ 0, 250000 ],
	  slide: function( event, ui ) {
		$( "#amount" ).val( ui.values[ 0 ] + " руб. - " + ui.values[ 1 ] + " руб." );
	  }
	});
	$( "#amount" ).val( $( "#slider-range" ).slider( "values", 0 ) +
	   " руб. - "  + $( "#slider-range" ).slider( "values", 1 ) + " руб." );
});

function bySeason() {
  document.getElementById("by-style-options").style.display = "none";
  document.getElementById("by-season-options").style.display = "block";
  document.getElementById("style").className = "";
  document.getElementById("season").className = "active";
}

function byStyle() {
  document.getElementById("by-season-options").style.display = "none";
  document.getElementById("by-style-options").style.display = "block";
  document.getElementById("style").className = "active";
  document.getElementById("season").className = "";
}

// // image
// #catalog-main > div._3rVr6Jh3Pr9ZyPlnMFv7Nf >
// div.preloader.preloader_1.preloader_wrapper > div > div:nth-child(1) > div >
// div.x-product-card__link.x-product-card__hit-area > a >
// div > div > img
// // link
// #catalog-main > div._3rVr6Jh3Pr9ZyPlnMFv7Nf >
// div.preloader.preloader_1.preloader_wrapper > div > div:nth-child(1) > div >
// div.x-product-card__link.x-product-card__hit-area > a
// // brand name
// #catalog-main >
// div._3rVr6Jh3Pr9ZyPlnMFv7Nf >
// div.preloader.preloader_1.preloader_wrapper >
// div >
// div:nth-child(1) >
// div >
// div.x-product-card__link.x-product-card__hit-area
// > div > div:nth-child(2) > div.x-product-card-description__brand-name
// // price
// #catalog-main > div._3rVr6Jh3Pr9ZyPlnMFv7Nf >
// div.preloader.preloader_1.preloader_wrapper > div > div:nth-child(1) > div >
// div.x-product-card__link.x-product-card__hit-area
// > div > div:nth-child(1) > span
