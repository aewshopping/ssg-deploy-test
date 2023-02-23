module.exports = function(eleventyConfig) {
  eleventyConfig.setTemplateFormats([
    // Templates:
    "html",
    "njk",
    "md",
    // Static Assets:
    "css",
    "jpeg",
    "jpg",
    "png",
    "svg",
    "woff",
    "woff2",
    "yml"
  ]);
  eleventyConfig.addPassthroughCopy("public");
  eleventyConfig.addPassthroughCopy('src/_redirects');

// import user defined shortcodes and filters
eleventyConfig.addWatchTarget("./src/utils/");
eleventyConfig.addPlugin(require("./src/utils/shortcodes.js"));
eleventyConfig.addPlugin(require("./src/utils/filters.js"));


  let markdownIt = require("markdown-it");
  let markdownItfn = require("markdown-it-footnote");
  let markdownItAnchor = require("markdown-it-anchor"); 
  let markdownItToc = require("markdown-it-table-of-contents"); 
  let md_options = {
    html: true
  };
 
  
  let markdownLib = markdownIt(md_options)
  .use(markdownItfn)
  .use(markdownItAnchor)
  .use(markdownItToc, {
      "includeLevel": [2,3,4],
      "listType": "ol",
      "containerClass":"toc_list",
      "containerHeaderHtml":"<hr><h3><strong>Contents</strong></h3><p><i>Links are to the headings in the article below</i></p>",
      "containerFooterHtml":"<hr>"});

  //some code to take out the square brackets that are otherwise
  //shown around the footnote numbers
  markdownLib.renderer.rules.footnote_caption = (tokens, idx) => {
  let n = Number(tokens[idx].meta.id + 1).toString();

  if (tokens[idx].meta.subId > 0) {
    n += ":" + tokens[idx].meta.subId;
  }

  return n;
};
  
  eleventyConfig.setLibrary("md", markdownLib);
 
  
  // From https://github.com/11ty/eleventy/issues/927
//  eleventyConfig.addFilter("keys", obj => Object.keys(obj));
  
  eleventyConfig.addCollection("posts", function(collection) {

    const coll = collection
      .getFilteredByTag("post")
      .sort((a, b) => b.data.date - a.data.date);

// From: https://github.com/11ty/eleventy/issues/529#issuecomment-568257426 
    // Adds {{ prevPost.url }} {{ prevPost.data.title }}, etc, to our njks templates
    for (let i = 0; i < coll.length; i++) {
      const prevPost = coll[i - 1];
      const nextPost = coll[i + 1];

      coll[i].data["prevPost"] = prevPost;
      coll[i].data["nextPost"] = nextPost;
    }

    return coll;
  });

  
  // Populates environment variables into process.env and makes it available in 11ty's global data https://github.com/11ty/eleventy/issues/782.
  require('dotenv').config();
  eleventyConfig.addGlobalData('env', process.env);
  
  
  const pluginRss = require("@11ty/eleventy-plugin-rss");
  eleventyConfig.addPlugin(pluginRss);
  
  return {
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",
      includes: "_includes",
      output: "build"
    }
  };
};