const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function () {

const QUOTE_SQL_QUERY = "select quotes.isbn_10,books.title,books.author,books.review_url,quotes.quote from quotes join books on books.isbn_10=quotes.isbn_10 ORDER BY RANDOM() LIMIT 100;"; // is it faster?

const URL_STEM_SQL = "https://datasette-for-history-books.glitch.me/data.json?sql="; // https://datasette-for-history-books.glitch.me/data is a backup but needs manually updated csv files. https://history-books-blush.vercel.app/data

const URL = `${URL_STEM_SQL}${encodeURIComponent(QUOTE_SQL_QUERY)}&_shape=array`;


/* This returns a promise */
return EleventyFetch(URL, {
    duration: "1d", // save for 1 day
    type: "json", // we’ll parse JSON for you
  });
};