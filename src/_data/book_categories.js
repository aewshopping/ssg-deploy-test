// adapted from https://daniel-saunders.com/posts/notes/using-airtable-as-a-jamstack-cms/
const EleventyFetch = require("@11ty/eleventy-fetch");

// Setting the Airtable secret API key and the Airtable base id 
// from environment variables
const airtableToken = process.env.mykey;
const airtableBaseId = process.env.mybase;
const airtableTableId = "tblooZV1SAAnWMpQC";

module.exports = async function() {

    // Constructing a query URL (using the Airtable API URL encoder 
    // here: https://codepen.io/airtable/pen/MeXqOg) and 
    // adding in our filter and sort parameters
    let url = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableId}?sort%5B0%5D%5Bfield%5D=sort_order&sort%5B0%5D%5Bdirection%5D=asc`;

    // The beauty of Eleventy Fetch -- pass in our URL and 
    // set a few options for caching and authorization
    const response = await EleventyFetch(url, {

    // Cache the responses for 1 hour; useful so you don't 
    // constantly ping and exceed the limits on Airtable's API
    duration: '1d',

    // Set the data response type
    type: 'json',
    directory: ".cache",

    // Append the Airtable API authorization key to the query
    fetchOptions: {
        headers: {
            authorization: `Bearer ${airtableToken}`
            },
        },
    });

    let { records } = await response;
    return records
};