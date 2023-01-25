// used for emoji pictures on book zoom modal
const CLDURL = "https://res.cloudinary.com/ds2o5ecdw/image/upload/f_auto/e_grayscale/e_brightness:30/twemoji/"
const CLDSFX = ".png";

//BOOKS FILTER CODE - START ///////////////////////////////////

// add click event function to all filter butons
const filterbtns_all = document.querySelectorAll(".filter-btn");
filterbtns_all.forEach(filterbtn => {
  filterbtn.addEventListener("click", function(btnID) {
    myFilterAnd(this.id);
  })  
});

function myFilterAnd(id) {
// this is the main filtering function that calls the sub functions

 //select the button element clicked
 var myfbtn = document.getElementById(id);
 myfbtn.classList.toggle("btn-color-accent");
 myfbtn.classList.toggle("btn-color-light");
 myfbtn.classList.toggle("onState");
  
  myDoFilterAnd();

  if (myfbtn.classList.contains("onState")) {
    myShowFilterLabel(id)
  } else {
    document.getElementById(id + "f").remove();
  }
}



function myShowFilterLabel(id) {
//  creates a button to match the filter that has just been applied, puts the button above the books so you can see which filters are active, then attaches a function to the button to allow you to remove the filter.
  
  var xbtn = document.createElement("button");
  var location = document.getElementById("myFilterGroup");
  var btnText = document.getElementById(id).innerHTML;
  
  xbtn.type = "button";
  xbtn.id = id + "f"
  xbtn.innerHTML = btnText;
  xbtn.classList.add('btn', 'btn-color-bg', 'btn-rounded', 'ft-size-small', 'my-close');
  location.appendChild(xbtn);
  
  // attach the function to the button
  xbtn.onclick = function () {
    myFilterAnd(id);
    xbtn.remove();
  };
}

function myDoFilterAnd() {
// note that each category needs at least two filters for this filter code to work on that category  
  
  var x=0;
  var z=0;
  var b=0;
  var catnumber=Number(document.getElementById("catcounter").dataset.counter)-1; // number of filter categories

  var catbuttons = [];
  var catbuttonsOn =[];
  var allbooks = document.getElementsByClassName('hbk');

  
  for (let i=0;i<=catnumber;i++) {
    catbuttons.push(document.getElementsByClassName('catbtn'+i));
    catbuttonsOn.push(document.getElementsByClassName('catbtn'+i + ' onState'));
}

    //cycle through all the books
  Loopbooks:
  for (let i=0;i<allbooks.length;i++) {
    x=0; //set up match counter
    z=1;
    
    //cycle through the button categories
    Loop_button_categories:
    for (let q=0;q<catbuttons.length;q++) {
      
      if (catbuttonsOn[q].length===0) {
        // don't apply filter in the case where no filters selected in a category, ie include book
        x++;            
      } else {
     
        //cycle through all the filter buttons within the category
        Loop_buttons_in_a_category:
        for (let p=0;p<catbuttons[q].length;p++) {
          var btn_id = catbuttons[q][p].id;        

          if (catbuttons[q][p].classList.contains("onState") && allbooks[i].classList.contains(btn_id)) {
            //if the p.th button of category q is "on" AND the i.th book has a matching id, then include book. Because within a category it is an OR filter we only need to find one match (or more). When match found, exit the loop
            x++;         
            break Loop_buttons_in_a_category;
          }
        } // loop buttons within a category
         
        }

      // check to see we have as many matches as button categories, if we have missed a match break loop      
      if (x < q + 1) {
        z=q
        break Loop_button_categories;
      }
      
    }  // loop button categories

    // if we have a failed category match, don't show the book
    if (x < z + 1) {
      allbooks[i].style.display = "none";

      } else {
        allbooks[i].style.display = "block";
        b++;
      } 
  
  } //loop books 
  
  // show the number of books we have remaining
  document.getElementById("bookCount").innerText = "Showing " + b + " books"  

//  window.alert(b + " history books")
}

//BOOKS FILTER CODE - END ///////////////////////////////////

//MODAL FOR BOOK COVERS /////////////////////

// EXTRACT EMOJIS AND SHOW B&W IMG //////////

// for each array item convert to unicode string
function toUnicode(text){
  return Array.from(text).map(char => char
  .codePointAt(0)
  .toString(16))
  .join("-");
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

// for each array item build img element 
function toImgArray(myArray) {
  return Array.from(myArray).map((unicode, index) => {
	  let emoji = emojiArrFull[index];
    let imgsrc = CLDURL + unicode + CLDSFX;
    return `<img class='img-emoji' loading='lazy' alt='${emoji}' title='${emoji}' src='${imgsrc}'>`;})
}

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

document.querySelectorAll('.open_modal_bookzoom').forEach(item => {
  item.addEventListener('click', event => {

    const myid = document.getElementById(item.id);
    
    modalTitle.innerText = myid.dataset.title;
    if (myid.dataset.author) {modalAuthor.innerText = "by " + myid.dataset.author;}
    if (myid.dataset.publishdate) {
      let myDate = new Date(myid.dataset.publishdate);
      modalPublishdate.innerText = getMonthName(myDate.getMonth()) + " " + myDate.getFullYear();
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
    
    let catList = myid.classList;

    displayId.innerHTML = createEmojiImg(String(catList));

    modal_bookzoom.showModal();
    document.activeElement?.blur(); // removes focus from close button
    console.log(item.id);

  })
})


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


function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString('en-US', { month: 'long' });
}

//END OF MODAL FOR BOOK COVERS /////////////////////