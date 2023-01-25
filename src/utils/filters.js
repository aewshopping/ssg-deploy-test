const { DateTime } = require("luxon");

module.exports = eleventyConfig => {

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
