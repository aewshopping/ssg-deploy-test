let colorModes = ["light-mode", "dark-mode", "byzantine-mode"];
let textSizes = [1, 1.15, 1.4]

const colorModeStored = localStorage.getItem("colorMode");
const textSizeStored = localStorage.getItem("textSize");


if (colorModeStored) {
  checkColor();
}

if (textSizeStored) {
  checkSize();
}

function checkColor() {
  
  for (let i = 0; i < colorModes.length; i++) {

    if (colorModeStored === colorModes[i] ) {

      document.body.classList.remove("light-mode");
      document.body.classList.add(colorModeStored);
      console.log("retrieved: " + colorModeStored);
    }
  }
}

function checkSize() {

  let txtIcon = document.getElementById('btn-txtsize-article');
  let z = 0;
  
    for (let i = 0; i < textSizes.length; i++) {

    if (textSizeStored == textSizes[i] ) {
      
      document.documentElement.style.setProperty('--size-modifier', textSizeStored);
      z = i;
    }
  }   
  if (z != 0) {
    txtIcon.classList.toggle("color-accent-fill");
  }
}


function next_in_array(myArray, targetID) {
  let currentMode;
  let nextMode;
  let myElem = document.getElementById(targetID);
  
	for (let i = 0; i < myArray.length; i++) {
    if (myElem.classList.contains(myArray[i])) {
      currentMode = myArray[i];
      let p = (i + 1) % myArray.length;
      nextMode = myArray[p];
    }    
  }
  myElem.classList.toggle(currentMode);
  myElem.classList.toggle(nextMode);
  
  localStorage.setItem("colorMode", nextMode);
  console.log ("stored: " + localStorage.getItem("colorMode"));
}


function cycle_text_size(buttonID) {
  let txtIcon = document.getElementById("btn-txtsize-article");
  let z = 0;
  
  let currentSize = getComputedStyle(document.documentElement).getPropertyValue('--size-modifier');
  let nextSize = 1;

    for (let i = 0; i < textSizes.length; i++) {
      if (textSizes[i] == currentSize) {
        z = i;
        let p = (i + 1) % textSizes.length;
        nextSize = textSizes[p];
        console.log(nextSize);
      }
    }
  
  document.documentElement.style.setProperty('--size-modifier', nextSize);
  localStorage.setItem("textSize", nextSize);
  console.log ("stored: " + localStorage.getItem("textSize"));

  if ((z == 0) || (z == [textSizes.length - 1])) {
    txtIcon.classList.toggle("color-accent-fill");
  }
}



function toggle_layer_scroll(id) {
   document.getElementById("under_section").classList.toggle("stickunder");
  document.getElementById("btn-layers-article").classList.toggle("color-accent-fill");
}

// to reveal a collapsed div, also rotate an arrow on the expander div if this exists
function toggle_showdetails(id, elem) {
  document.getElementById(elem).classList.toggle("uncollapsed");
  document.getElementById(id).classList.toggle("arrow-right");
  document.getElementById(id).classList.toggle("arrow-down"); // only works if you have a unique expander per collapse otherwise gets confused which way to point the arrow!
}

// to reveal a collapsed list when focus inside
function toggle_on_showdetails(btnID, elem) {
  document.getElementById(elem).classList.add("uncollapsed");
}

// allows you to press enter trigger click event on an div with class expander
const expanders_all = document.querySelectorAll(".expander");
expanders_all.forEach(expander => {
  expander.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {expander.click();}
  })
});



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

//PROGRESS BAR CODE ////////////////////////////////////////
//let lastKnownScrollPosition = 0;
let ticking = false;

function updateProgressBar() {
  let element = document.getElementById("progress-section");
  
  let elemTop = element.getBoundingClientRect().top;
  let elemHeight = element.scrollHeight;
  let visScreenHeight = window.innerHeight;
  
  let fullProgress = (-elemTop / (elemHeight - visScreenHeight)) * 100;
  let progress = Math.max(0 , Math.min(100, fullProgress)) + "%";

//  console.log(-elemTop / (elemHeight - visScreenHeight));
  document.getElementById("progress-bar").style.setProperty("--scroll-amount", progress);
}

document.addEventListener('scroll', function(e) {
//  lastKnownScrollPosition = window.scrollY;

  // this bit is to prevent running code if not actively scrolling
  if (!ticking) {
    window.requestAnimationFrame(function() {
      updateProgressBar();
      ticking = false;
    });

    ticking = true;
  }
});
//END OF PROGRESS BAR CODE ////////////////////////////////////////


//SHARING BUTTON CODE USING WEB SHARE API ///////////////////////// 
const mytitle = document.title;
const myurl = document.querySelector('link[rel=canonical]') ? document.querySelector('link[rel=canonical]').href : document.location.href;

let shareData = {
  title: mytitle,
  text: '',
  url: myurl,
}

let btnShare = document.getElementsByClassName("share-link");
    for (var i = 0; i < btnShare.length; i++) {
        btnShare[i].addEventListener("click", () => {
          navigator.share(shareData)
        .then(() =>
          console.log('Share successfull!')
        )
        .catch((e) =>
          console.log('Error: ' + e)
        )
        });
    }

//END OF SHARING BUTTON CODE USING WEB SHARE API /////////////////////


//MODAL FOR BOOK COVERS /////////////////////

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
    if (myid.dataset.review) {modalLink_review.href = myid.dataset.review;
    
    if (myid.dataset.review.length == 0) {
      modal_review_btn.style.display = "none";
    } else {
      modal_review_btn.style.display = "block";
    }
  }
    
    modal_bookzoom.showModal();
    document.activeElement?.blur(); // removes focus from close button
    console.log(item.id);

  })
})


modalClose.addEventListener("click", () => {
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