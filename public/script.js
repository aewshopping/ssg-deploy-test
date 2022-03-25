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

  let myBtn = document.getElementById('btn-txtsize-article');
  let z = 0;
  
    for (let i = 0; i < textSizes.length; i++) {

    if (textSizeStored == textSizes[i] ) {
      
      document.documentElement.style.setProperty('--size-modifier', textSizeStored);
      z = i;
    }
  }   
  if (z != 0) {
    myBtn.classList.toggle("color-accent");
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
  let myBtn = document.getElementById(buttonID);
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
    myBtn.classList.toggle("color-accent");
  }
}



function toggle_layer_scroll(id) {
   document.getElementById("under_section").classList.toggle("stickunder");
  document.getElementById(id).classList.toggle("color-accent");
}


function toggle_showdetails(btnID, elem) {
  document.getElementById(elem).classList.toggle("uncollapsed");
  document.getElementById(btnID).classList.toggle("uncollapsed");
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