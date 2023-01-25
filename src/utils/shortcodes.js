const staticData = require("../_data/staticdata.json");
// "./src/utils/shortcodes.js"

function toUnicode16(text){
  return Array.from(text).map(char => char
  .codePointAt(0)
  .toString(16))
  .join("-");
  }


module.exports = eleventyConfig => {

  eleventyConfig.addShortcode("twemoji", function(str, options = "") {
    let cldurl = `${staticData.links.cloudinary}f_auto/${options}twemoji/`;
    let cldsfx = ".png";
     let imgurl = cldurl + toUnicode16(str) + cldsfx;
    let element = `<img class='img-emoji' alt='${str}' loading='lazy' src='${imgurl}'>`;

    return element;
  });

  eleventyConfig.addFilter("twemoji_test", function(str) {
    return toUnicode16(str);
  });

  eleventyConfig.addShortcode("testfunction", function() {
	return "hello again";
  });
};