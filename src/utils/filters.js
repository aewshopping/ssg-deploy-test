const { DateTime } = require("luxon");

module.exports = eleventyConfig => {

  eleventyConfig.addFilter("excerpt_quote", (post) => {
  const MAXWORDS = 60;
  const END_MARKER = "📣";
  
  let end_position = post.search(END_MARKER);
  if (end_position==-1) {end_position=post.length}; // if no end marker just use string length
  const curtailed = post.slice(0,end_position); // remove any text beyond end marker character
  const removeTags = curtailed.replace(/(<([^>]+)>)/gi, "").trim(); // remove html tags
  const wordcount = removeTags.split(" ").length; // find how many words
  let excerpt = removeTags.split(" ").slice(0,Math.min(wordcount, MAXWORDS)).join(" ").trim(); // cut off array at max wordcount and turn back to string
  if (wordcount > MAXWORDS) {excerpt += "...";}
  return excerpt;
  });
  
  eleventyConfig.addFilter("excerpt", (post) => {
  const content = post.replace(/(<([^>]+)>)/gi, "");
  return content.substr(0, content.lastIndexOf(" ", 200)) + "...";
  });

  // Filters let you modify the content https://www.11ty.dev/docs/filters/
  eleventyConfig.addFilter("htmlDateString", dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("d LLLL yyyy");
  });

  eleventyConfig.addFilter("myDateString", dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("LLLL yyyy");
  });
  
  eleventyConfig.addFilter("myDateYear", dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy");
  });

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  
  // This filter intakes a string and inserts a non-breaking space between the last two words to prevent a single word dangling on the last line https://11ty.rocks/eleventyjs/content/
  eleventyConfig.addFilter("addNbsp", (str) => {
    if (!str) {
      return;
    }
    let title = str.replace(/((.*)\s(.*))$/g, "$2&nbsp;$3");
    title = title.replace(/"(.*)"/g, '\\"$1\\"');
    return title;
  });


// From: https://11ty.rocks/eleventyjs/data-arrays/  
eleventyConfig.addFilter("limit", function (arr, limit) {
  return arr.slice(0, limit);
});  
  
}
