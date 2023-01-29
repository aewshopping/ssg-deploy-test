// my thanks to https://jamesdoc.com/blog/2022/11ty-airtable/
// also see https://www.11ty.dev/docs/plugins/fetch/

require("dotenv").config();
const { AssetCache } = require("@11ty/eleventy-fetch");
const Airtable = require("airtable");

const assetCacheId = "airtableCMS";

var base = new Airtable({ apiKey: process.env.mykey }).base(
  process.env.mybase
);

module.exports = () => {
  let asset = new AssetCache(assetCacheId);

  // Cache the data in 11ty for one day
  if (asset.isCacheValid("1d")) {
    console.log("Serving airtable data from the cache…");
    return asset.getCachedValue();
  }

  // The 11ty cache is cold… so we need to talk to Airtable
  return new Promise((resolve, reject) => {
    const allCases = [];

    base("Books (all)")
      .select({
      maxRecords: 1000,
      fields: ["Title", "Author", "HB Publish date", "ASIN (HB)", "Review url", "URL Cldnry img small", "URL Cldnry img large", "Create css filter classes"],
      filterByFormula: "{go live}=1",
      sort: [{field: "HB Publish date", direction: "desc"}]
    })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(record => {
            allCases.push({
              id: record._rawJson.id,
              ...record._rawJson.fields
            });
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            reject(err);
          } else {
            asset.save(allCases , "json");
            resolve(allCases);
          }
        },
      );
  });
};