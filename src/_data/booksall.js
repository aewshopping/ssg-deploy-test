require("dotenv").config();

var Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.mykey }).base(
  process.env.mybase
);


module.exports = function() {
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
            resolve(allCases);
          }
        }
      );
  });
};