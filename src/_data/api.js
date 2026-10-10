// Single source of truth for the history books Datasette API.
// Used at build time (require it from _data files) and in the browser
// (head_scripts.html outputs api.clientScript, which defines window.apiUrl and window.apiFetch).
//
// The token is deliberately hard-coded: it is only a low-security measure to deter casual scrapers.
// It is sent as the _auth_token query parameter (not an Authorization header, which would trigger a CORS preflight).

const BASE_URL = "https://history-books-blush.vercel.app"; // https://datasette-for-history-books.glitch.me is a backup but needs manually updated csv files
const TOKEN = "Mushroom1";

// Builds an API url with the token added. Accepts a path such as "/data.json?sql=..." or a full url.
// Kept free of outside references so it can also be serialised into the page for client-side scripts.
function apiUrl(path, base, token) {
  let url = /^https?:\/\//.test(path) ? path : base + path;
  if (/[?&]_auth_token=/.test(url)) return url; // eg Datasette next_url values already include it
  return url + (url.includes("?") ? "&" : "?") + "_auth_token=" + encodeURIComponent(token);
}

// Browser fetch that returns parsed JSON and logs a clear error on a 403.
function apiFetch(url) {
  return fetch(url).then(function (response) {
    if (response.status === 403) {
      const msg = "History books API: missing/invalid API token (HTTP 403) - check the token in src/_data/api.js";
      console.error(msg);
      throw new Error(msg);
    }
    if (!response.ok) {
      throw new Error("History books API: HTTP " + response.status + " for " + url.split("_auth_token=")[0]);
    }
    return response.json();
  });
}

const url = (path) => apiUrl(path, BASE_URL, TOKEN);

// Build-time JSON fetch (cached via eleventy-fetch), with a clear error on a 403.
async function fetchJson(path, options = {}) {
  const EleventyFetch = require("@11ty/eleventy-fetch");
  try {
    return await EleventyFetch(url(path), { duration: "1d", type: "json", ...options });
  } catch (error) {
    if (/\(403\)/.test(String(error && error.message))) {
      throw new Error("History books API: missing/invalid API token (HTTP 403) - check the token in src/_data/api.js");
    }
    throw error;
  }
}

const clientScript = `(function () {
${apiUrl.toString()}
${apiFetch.toString()}
window.apiUrl = function (path) { return apiUrl(path, ${JSON.stringify(BASE_URL)}, ${JSON.stringify(TOKEN)}); };
window.apiFetch = apiFetch;
})();`;

module.exports = { baseUrl: BASE_URL, token: TOKEN, url, fetchJson, clientScript };
