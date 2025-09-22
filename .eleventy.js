const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // --- 既存のフィルター ---

  // 読みやすい日付フィルター
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("yyyy.MM.dd");
  });

  // ISO形式の日付フィルター
  eleventyConfig.addFilter('isoDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toISODate();
  });

  // --- ▼▼▼ ここから追加 ▼▼▼ ---

  // 配列の中から指定したキーと値に一致する「最初の要素」を返すカスタムフィルター
  eleventyConfig.addFilter("find", function(array, key, value) {
    if (!Array.isArray(array)) {
      return undefined;
    }
    return array.find(item => item[key] === value);
  });

  // 配列の中から指定したキーと値に一致する「すべての要素」を返すカスタムフィルター
  eleventyConfig.addFilter("filter", function(array, key, value) {
    if (!Array.isArray(array)) {
      return [];
    }
    return array.filter(item => item[key] === value);
  });

  // --- ▲▲▲ ここまで追加 ▲▲▲ ---


  // "articles" コレクションの定義
  eleventyConfig.addCollection("articles", function(collectionApi) {
    return collectionApi.getFilteredByTag("articles").sort(function(a, b) {
      return b.date - a.date;
    });
  });

  // ファイルのパススルーコピー
  eleventyConfig.addPassthroughCopy("src/assets");

  // Eleventyの設定
  return {
    dir: {
      input: "src",
      output: "docs",
      includes: "_includes",
      data: "_data"
    },
    pathPrefix: "/ranking/"
  };
};