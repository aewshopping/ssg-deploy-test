const staticData = require("../_data/staticdata.json");
// "./src/utils/shortcodes.js"

function toUnicode16(str) {
  var myArr = Array.from(str); //can't use str.length due to emoji unicode weirdness
  var myStr =""; //can't get map to work it seems due to eleventy weirdness
  for (var i = 0; i < myArr.length; i++) {
    myStr += myArr[i].codePointAt(0).toString(16) +"-";
}
  return myStr.slice(0, -1);
}

module.exports = eleventyConfig => {

  eleventyConfig.addShortcode("twemoji", function(str, options = "") {
    var cldurl = `${staticData.links.cloudinary}f_auto/${options}twemoji/`;
    var cldsfx = ".png";
     var imgurl = cldurl + toUnicode16(str) + cldsfx;
    var element = `<img class='img-emoji' alt='${str}' loading='lazy' src='${imgurl}'>`;   

    return element;
  });
  
  eleventyConfig.addFilter("twemoji_test", function(str) {
    return toUnicode16(str);
  });

  eleventyConfig.addShortcode("testfunction", function() {
	return "hello!";
  });
};