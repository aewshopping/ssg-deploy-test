const QUOTE_SQL_QUERY =
  "select quotes.isbn_10,books.title,books.author,books.review_url,quotes.quote from quotes join books on books.isbn_10=quotes.isbn_10 where quotes.rowid=(abs(random())%(select(select max(quotes.rowid)from quotes)+1));";

const URL_STEM_SQL =
  "https://datasette-for-history-books.glitch.me/data.json?sql=";

function myClick(quote, quoteref) {

  getquote(quote, quoteref)
    .then((response) => {
      console.log("got quote");
    })
    .catch((error) => {
      console.error(error);
      console.log("an error!");
    });
}

async function getquote(quote, quoteref) {
  const URL = `${URL_STEM_SQL}${encodeURIComponent(QUOTE_SQL_QUERY)}--${Math.random().toFixed(5)}&_shape=array`; // cache busting with random number after inline sql comment symbol "--"
  const response = await fetch(URL);
  const data = await response.json();
  const URLSTEM = data[0].review_url;
  const TEXTFRAG = data[0].quote;
  const AUTHOR = data[0].author;
  const TITLE = data[0].title;
  createLink(quote, quoteref, URLSTEM, TEXTFRAG, AUTHOR, TITLE);
}

function createLink(quote, quoteref, urlstem, textfrag, author, title) {
  
  let hreflink = createTextFragURL(urlstem, textfrag);
  let myLink = document.getElementById(quoteref);
  myLink.href = hreflink;
  myLink.innerText = `${author}, ${title}`;

  let myQuote = document.getElementById(quote);
  myQuote.innerText = curtailquote(textfrag);
}

function getFirstWords(str, num) {
  return str.split(" ").slice(0, num).join(" ");
}
function getLastWords(str, num) {
  return str.split(" ").slice(-num).join(" ");
}

function createTextFragURL(urlstem, textfrag) {
  let textfragLEFT = encodeURIComponent(getFirstWords(textfrag, 3));
  let textfragRIGHT = encodeURIComponent(getLastWords(textfrag, 3));
  let textfragSEARCH = `${textfragLEFT},${textfragRIGHT}`;

  // check url has forward slash on the end and add if not
  if (urlstem.slice(-1) != "/") {
    urlstem += "/";
  }

  return `${urlstem}#:~:text=${textfragSEARCH}`;
}

function curtailquote(text) {
  const MAXWORDS = 60;
  const wordcount = text.split(" ").length; // find how many words
  let curtailed = text
    .split(" ")
    .slice(0, Math.min(wordcount, MAXWORDS))
    .join(" ")
    .trim(); // cut off array at max wordcount and turn back to string
  if (wordcount > MAXWORDS) {
    curtailed += "..."; // if not the end of the text add a ...
  }
  return curtailed;
}