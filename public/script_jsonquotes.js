// This is alternative way of getting quotes. Relies on creating a json file with eleventy in build stage, using a call to the SQL database at that time, and then referencing the json file on the front end. I have maxed out the number of quotes in the json file at 100 to manage file size. They are selected in a random order from SQL at build, so that if > 100 in total, randomly selects 100 of them. This script selects a random quote no from the json file each time. Note - doesn't seem to be any quicker than just calling SQL from front end directly!
const URL = "/data/quotes.json";

function updateQuote(quote, quoteref) {

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
  const response = await fetch(URL);
  const data = await response.json();

  const RAND_100 = Math.floor(Math.random() * data.length+1) + 1;

  const URLSTEM = data[RAND_100].review_url;
  const TEXTFRAG = data[RAND_100].quote;
  const AUTHOR = data[RAND_100].author;
  const TITLE = data[RAND_100].title;
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
