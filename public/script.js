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


function toggle_showdetails(btnID, elem) {
  document.getElementById(elem).classList.toggle("uncollapsed");
}

function toggle_on_showdetails(btnID, elem) {
  document.getElementById(elem).classList.add("uncollapsed");
}


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

const modal = document.querySelector('.modal_bookzoom');
const modalTitle = document.querySelector('.myModalTitle');
const modalImage = document.querySelector('.myModalImage');
const modalLink_AmazonUK = document.querySelector('.myModalLink_AmazonUK');
const modalLink_AmazonUS = document.querySelector('.myModalLink_AmazonUS');
const modalLink_review = document.querySelector('.myModalLink_review');
const modal_review_btn = document.querySelector('.myModal_review_btn');
const modalClose = document.querySelector('.modal_close');

document.querySelectorAll('.open-modal').forEach(item => {
  item.addEventListener('click', event => {

    const myid = document.getElementById(item.id);
    
    modalTitle.innerText = myid.dataset.title;
    modalImage.src = myid.dataset.cover_large;
    modalLink_AmazonUK.href = myid.dataset.amazon_uk_link;
    modalLink_AmazonUS.href = myid.dataset.amazon_us_link;
    modalLink_review.href = myid.dataset.review;
    
    if (myid.dataset.review.length == 0) {
      modal_review_btn.style.display = "none";
    } else {
      modal_review_btn.style.display = "block";
    }
    
    
    modal.showModal();
    document.activeElement?.blur(); // removes focus from close button
    console.log(item.id);

  })
})


modalClose.addEventListener("click", () => {
  modal.close();
});

//END OF MODAL FOR BOOK COVERS /////////////////////