let query = document.querySelector(".js-query");
let searchButton = document.querySelector(".js-search");

searchButton.onclick = function () {
	let url = "https://www.google.com/search?q=" + query.value;
	// let url = "https://search.yahoo.co.jp/search?p=" + query.value;
	window.open(url, "_self");
};
