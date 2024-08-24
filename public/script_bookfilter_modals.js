// used for emoji pictures on book zoom modal
const CLDURL = "https://res.cloudinary.com/ds2o5ecdw/image/upload/f_auto/e_grayscale/e_brightness:30/twemoji/"
const CLDSFX = ".png";


//MODAL FOR BOOK COVERS /////////////////////

// EXTRACT EMOJIS AND SHOW B&W IMG //////////

let emojiArrFull = []; // need to declare before function as used in two different functions

// master function that creates a set of emoji images from a string which
// contains space seperated emojis and other non emoji text
function createEmojiImg(str) {

  let wordArr = str.split(" "); // create array from string using spaces as delimiter
  let emojiArr = toEmojiArray(wordArr); // remove any non emoji characters from items
  let emojiArrFilter = emojiArr.filter(Boolean); // remove any null items from array
  emojiArrFull = arrJoinSubArray(emojiArrFilter); // join any sub array items such as flag emojis which have two unicode codepoints
  let unicodeArr = toUnicodeArray(emojiArrFull); // convert emojis to hyphen seperated unicode codepoint values
  let imgArr = toImgArray(unicodeArr).join(" "); // create img element using unicode values as file names

return imgArr;
}


// for each array item remove everything that is not emoji
// btw regex emoji and regex emoji_presentation miss a lot of emojis hence this longer regex expression
function toEmojiArray(myArray) {
  
  const regexpEmoji = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;
  return Array.from(myArray).map(str => str
  .match(regexpEmoji));
}


// for each array item join sub-arrays
function arrJoinSubArray(myArray) {
  return Array.from(myArray).map((emoji) => {

    return emoji.join("");})
}


// convert emojis in array to unicode strings
function toUnicodeArray(myArray) {
  return Array.from(myArray).map((emoji) => {

    return toUnicode(emoji);})
}

// for each array item convert to unicode string
function toUnicode(text){
  return Array.from(text).map(char => char
  .codePointAt(0)
  .toString(16))
  .join("-");
}


// for each array item build img element 
function toImgArray(myArray) {
  return Array.from(myArray).map((unicode, index) => {
	  let emoji = emojiArrFull[index];
    let imgsrc = CLDURL + unicode + CLDSFX;
    return `<img class='img-emoji' loading='lazy' alt='${emoji}' title='${emoji}' src='${imgsrc}'>`;})
}


// END OF EXTRACT EMOJIS AND SHOW B&W IMG //////////


const modal_bookzoom = document.querySelector('.modal_bookzoom');
const modalTitle = document.querySelector('.myModalTitle');
const modalAuthor = document.querySelector('.myModalAuthor');
const modalPublishdate = document.querySelector('.myModalPublishdate');
const modalImage = document.querySelector('.myModalImage');
const modalLink_AmazonUK = document.querySelector('.myModalLink_AmazonUK');
const modalLink_AmazonUS = document.querySelector('.myModalLink_AmazonUS');
const modalLink_review = document.querySelector('.myModalLink_review');
const modal_review_btn = document.querySelector('.myModal_review_btn');
const modalClose = document.querySelector('.modal_close');
const displayId = document.getElementById("book_cat_display");

function open_modal_bookzoom(id) {
  // updates the modal bookzoom with book info from the book grid element
  const myid = document.getElementById(id);

  modalTitle.innerText = myid.dataset.title;
  if (myid.dataset.author) {
    modalAuthor.innerText = "by " + myid.dataset.author;
  }
  if (myid.dataset.publishdate) {
    let myDate = new Date(myid.dataset.publishdate);
    modalPublishdate.innerText =
      getMonthName(myDate.getMonth()) + " " + myDate.getFullYear();
  }
  modalImage.src = myid.dataset.cover_large;
  modalLink_AmazonUK.href = myid.dataset.amazon_uk_link;
  modalLink_AmazonUS.href = myid.dataset.amazon_us_link;

  if (myid.dataset.review.length == 0) {
    modal_review_btn.style.display = "none";
  } else {
    modal_review_btn.style.display = "block";
    modalLink_review.href = myid.dataset.review;
  }

  let catList = myid.dataset.emojis;

  displayId.innerHTML = createEmojiImg(String(catList));

  modal_bookzoom.showModal();
  document.activeElement?.blur(); // removes focus from close button
}



modalClose.addEventListener("click", () => {
  modalImage.src ="";
  modal_bookzoom.close();
});


const modal_bookfilter = document.querySelector('.modal_bookfilter');
const modal_bookfilter_close = document.querySelector('.modal_bookfilter_close');

document.querySelectorAll('.open_modal_bookfilter').forEach(item => {
  item.addEventListener('click', event => {
    modal_bookfilter.showModal();
    document.activeElement?.blur(); // removes focus from close button
 })
})


modal_bookfilter_close.addEventListener("click", () => {
  modal_bookfilter.close();
});


// Function used to render text month and number year in bookzoom modal
function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber); // for some reason it used to work with a minus one here
  return date.toLocaleString('en-US', { month: 'long' });
}

//END OF MODAL FOR BOOK COVERS /////////////////////