# HTMLの静的サイトでもマークダウンで記事を書きたい

サイトをコーディングしていると、

- **WordPressを構築するほどじゃないけど記事ページがある**
- **小規模なサイトで会社概要だけマークダウンで作成したい**
- **ポートフォリオサイト等で制作物のページだけマークダウンで管理したい**

という状況って結構あるんじゃないかなと思います。

マークダウンからHTML化させるVSCodeの拡張機能とかもありますが、マークダウンの文言含めてGitHubで管理したいなと思い、jQueryとmarkdown-it.jsというのを使ってHTML＋マークダウンで簡易な複数ページのサイトを構築するコードをまとめました。

## 最低限のサンプルコード

まずは、マークダウンで作成できる最低限のコードを紹介します。

`js-markdown-editer`というクラス内の部分がマークダウンで書くと変換されるようになります。（インデントつけるとコンパイルされないです…😭）

```html
<!-- マークダウン記述箇所 -->
<main class="l-main-editer js-markdown-editer">
# h1タイトル

## h2タイトルタイトルタイトルタイトル

### h3タイトルタイトルタイトルタイトル

ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。
ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。

強調したい箇所は**このように強調させる**ことも可能。

- リスト1
- リスト2
    - リスト2-1
    - リスト2-2
    - リスト2-3
- リスト3
- リスト4

リンクは[リンクテキスト](https://yurukei-career.com/)のように記載。引用ブロックは以下。

> 引用ブロックはこのようになる。
改行もこのように組み込まれる。

## テーブル

| No | 名前 | 年齢 |
|---:|----:|:----:|
| 1  | 山田 |  24 |
| 2  | 田中 |  48 |

</main>
<!-- /マークダウン記述箇所 -->
```

JavaScriptはjQueryとmarkdown-it.jsを用いるので、以下のようにCDNで呼び出します。

```html
<script src="https://code.jquery.com/jquery-1.9.1.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/markdown-it/8.2.2/markdown-it.min.js"></script>
```

JavaScriptでマークダウンの設定や変換をしていきます。
改行を`<br>`に変換するかなどもここで設定します。

```js
// マークダウンの基本設定
const markdown_setting = window.markdownit({
  html: true, // htmlタグを有効にする
  breaks: true, // md内の改行を<br>に変換
});

// .js-markdown-editerを定義
const markdown_editer = $(".js-markdown-editer");

// マークダウンの設定をjs-markdown-editerにHTMLとして反映させる
const markdown_html = markdown_setting.render(getHtml(markdown_editer));
markdown_editer.html(markdown_html);
  
// 比較演算子（=，<>，<，<=，>，>=）をそのまま置換する
function getHtml(selector) {
  let markdown_text = $(selector).html();
  markdown_text = markdown_text.replace(/&lt;/g, "<");
  markdown_text = markdown_text.replace(/&gt;/g, ">");
  markdown_text = markdown_text.replace(/&amp;/g, "&");

  return markdown_text;
}
```

## かんたんな仕組み

（専門分野ではないので解説が粗い・誤っている？かもしれないのでミスあればご指摘ください。🙇）

### マークダウンの基本設定

```js
// マークダウンの基本設定
const markdown_setting = window.markdownit({
  html: true, // htmlタグを有効にする
  breaks: true, // md内の改行を<br>に変換
});
```

`html: true`で、マークダウンエディタ内でHTMLを直でコーディングした際に、そのままタグを表示させるかを設定します。
`html: false`にすると、HTMLタグがそのままむき出しで表示されます。

`breaks: true`で、エディタ内で改行した際に、`<br>`に変換するかどうかを設定。

### マークダウンをHTMLに変換

```js
// .js-markdown-editerを定義
const markdown_editer = $(".js-markdown-editer");

// マークダウンの設定をjs-markdown-editerにHTMLとして反映させる
const markdown_html = markdown_setting.render(getHtml(markdown_editer));
markdown_editer.html(markdown_html);
```

`js-markdown-editer`で書いたマークダウンをHTMLに変換します。

ただ、これだけだと引用ブロックの`> 引用文`が`<blockquote>`に変換されません。
なので、以下のように比較演算子を置換します。

```js
// 比較演算子（=，<>，<，<=，>，>=）をそのまま置換する
function getHtml(selector) {
  let markdown_text = $(selector).html();
  markdown_text = markdown_text.replace(/&lt;/g, "<");
  markdown_text = markdown_text.replace(/&gt;/g, ">");
  markdown_text = markdown_text.replace(/&amp;/g, "&");

  return markdown_text;
}
```

## テンプレート作成用のコード

上記の最低限のサンプルコードだけでもまあ使えますが、毎回CSSを書いたりするのも面倒なので、もう少しテンプレートとして使いやすいコードを最後にまとめてみます。
（あくまで自分用なので最低限のサンプルコードより使いにくいかもです…。）

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <!-- reset.css destyle -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/destyle.css@1.0.15/destyle.css"
    />
    <link rel="stylesheet" href="./css/style.css"/>
  </head>
  <body>
    <header class="l-header">
      <div class="l-header__logo">LOGO</div>
    </header>

    <!-- マークダウン記述箇所 -->
    <main class="l-main-editer js-markdown-editer">
# h1タイトル

## h2タイトルタイトルタイトルタイトル

### h3タイトルタイトルタイトルタイトル

ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。
ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。ダミーテキストです。

強調したい箇所は**このように強調させる**ことも可能。

- リスト1
- リスト2
    - リスト2-1
    - リスト2-2
    - リスト2-3
- リスト3
- リスト4

リンクは[リンクテキスト](https://yurukei-career.com/)のように記載。引用ブロックは以下。

> 引用ブロックはこのようになる。
改行もこのように組み込まれる。

## テーブル

| No | 名前 | 年齢 |
|---:|----:|:----:|
| 1  | 山田 |  24 |
| 2  | 田中 |  48 |

---

HTMLをそのまま埋め込むことも可能。

<h2>HTMLタイプのh2テキストとテーブル</h2>

<table>
  <tr>
    <th>No</th>
    <th>名前</th>
    <th>年齢</th>
  </tr>
  <tr>
    <td>1</td>
    <td>山田</td>
    <td>24</td>
  </tr>
  <tr>
    <td>2</td>
    <td>田中</td>
    <td>48</td>
  </tr>
</table>

    </main>
    <!-- /マークダウン記述箇所 -->

    <footer class="l-footer">
      <small class="l-footer__small">&copy;&nbsp;yurukei20</small>
    </footer>

    <script src="https://code.jquery.com/jquery-1.9.1.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/markdown-it/8.2.2/markdown-it.min.js"></script>
    <script src="./js/script.js"></script>
  </body>
</html>
```

```css
/* ──────────────────────────────
  * base
  ────────────────────────────── */
body {
  font-size: 16px;
  line-height: 1.7;
}
/* aタグ */
a:not([class]) {
  color: #006cd8;
  text-decoration: none;
}
a:not([class]):hover {
  color: #2f90f4;
  text-decoration: underline;
}

/* ──────────────────────────────
  * レイアウト
  ────────────────────────────── */
.l-header,
.l-footer {
  color: #fff;
  background-color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.l-main-editer {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 16px;
}

/* ──────────────────────────────
  * エディタ内のスタイル
  ────────────────────────────── */
.l-main-editer > * {
  margin: 16px 0;
}
/* 見出し */
.l-main-editer > h1 {
  font-size: 28px;
  font-weight: bold;
}
.l-main-editer > h2 {
  font-size: 24px;
  font-weight: bold;
  margin-top: 40px;
}
.l-main-editer > h3 {
  font-size: 20px;
  font-weight: bold;
  margin-top: 28px;
}
/* リスト */
.l-main-editer > ul,
.l-main-editer > ol,
.l-main-editer > ul > li > ul,
.l-main-editer > ul > li > ol {
  padding-left: 24px;
}
.l-main-editer > ul,
.l-main-editer > ul > li > ul,
.l-main-editer > ol > li > ul {
  list-style: disc;
}
.l-main-editer > ol,
.l-main-editer > ol > li > ol,
.l-main-editer > ul > li > ol {
  list-style: decimal;
}
/* 引用ブロック */
.l-main-editer > blockquote {
  padding: 20px;
  background-color: #efefef;
}
/* 区切り */
.l-main-editer > hr {
  margin-top: 40px;
  margin-bottom: 40px;
}
/* 表 */
.l-main-editer > table {
  border-collapse: collapse;
  border: solid 2px #333;
}
.l-main-editer > table th,
.l-main-editer > table td {
  padding: 8px 10px;
}
.l-main-editer > table th {
  border: solid 1px #333;
  background-color: #efefef;
}
.l-main-editer > table td {
  border: dashed 1px #333;
}
/* コード */
.l-main-editer p code{
    background-color: #efefef;
    border-radius: 4px;
    padding: 2px 4px;
}
.l-main-editer pre{
  color: #fff;
  background-color: #333;
  border-radius: 4px;
  padding: 16px;
}
```

```js
// マークダウンの基本設定
const markdown_setting = window.markdownit({
  html: true, // htmlタグを有効にする
  breaks: true, // md内の改行を<br>に変換
});

const markdown_editer = $(".js-markdown-editer");

// マークダウンの設定をjs-markdown-editerにHTMLとして反映させる
const markdown_html = markdown_setting.render(getHtml(markdown_editer));
markdown_editer.html(markdown_html);
  
// 比較演算子（=，<>，<，<=，>，>=）をそのまま置換する
function getHtml(selector) {
  let markdown_text = $(selector).html();
  // let markdown_text = document.querySelectorAll(selector)[1].innerHTML;
  markdown_text = markdown_text.replace(/&lt;/g, "<");
  markdown_text = markdown_text.replace(/&gt;/g, ">");
  markdown_text = markdown_text.replace(/&amp;/g, "&");

  return markdown_text;
}
```

## 最後に

ということで、jQueryとmarkdown-it.jsを用いたマークダウンのHTMLサイト実装例をまとめました。

gulpやEJSを用いれば、さらにマークダウンで書きやすいサイトを構築できるのではないかなと思います。
気軽にマークダウンでサイトを構築できる環境ができたらまた記事にしてみますー。

皆さんのコーディングでの参考になれば幸いです。

それでは。👋

