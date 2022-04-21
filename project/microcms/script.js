$(function () {
	$.ajax({
		url: "https://traveler20.microcms.io/api/v1/news",
		type: "GET",
		dataType: "json",
		headers: {
			"Content-Type": "application/json",
			"X-MICROCMS-API-KEY": "86854f9d1fba4a5a8a9cbadc5ed7ee8a8b80",
		},
	})
		.done(function (data) {
			var article = "";
			var lines = "";

			// 各値の取得
			$.each(data.contents, function (index, value) {
				var date = value.publishedAt.slice(0, 10);
				var title = value.title;
				var body = value.content;
				// var image = value.image.url;
				var id = value.id;

				// 個別記事のHTMLを生成
				var article_id = location.search.slice(4, 20);
				if (id === article_id) {
					article =
						"<h3>" +
						title +
						'</h3>\
                        <time datetime="' +
						date +
						'">' +
						date +
						"</time>\
                        <p>" +
						body +
						"</p>";
					$(".js-cms-article").html(article);
				}

				// 記事一覧のHTMLを生成
				lines +=
					'<div>\
                    <a href="./?id=' +
					id +
					'">\
                    <h3>' +
					title +
					'</h3>\
                    <time datetime="' +
					date +
					'">' +
					date +
					"</time>\
                    </a></div>";
			});
			$(".js-cms-list").html(lines);
		})
		.fail(function () {
			console.log("failed");
		});
});
