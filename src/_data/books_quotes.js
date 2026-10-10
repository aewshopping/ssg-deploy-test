const api = require("./api.js");

module.exports = async function () {

const QUOTE_SQL_QUERY = "select quotes.isbn_10,books.title,books.author,books.review_url,quotes.quote from quotes join books on books.isbn_10=quotes.isbn_10 ORDER BY RANDOM() LIMIT 100;"; // is it faster?

const URL = `/data.json?sql=${encodeURIComponent(QUOTE_SQL_QUERY)}&_shape=array`; // api.fetchJson adds the base url and token


/* This returns a promise */
return api.fetchJson(URL, {
    duration: "1d", // save for 1 day
    type: "json", // we’ll parse JSON for you
  });
};