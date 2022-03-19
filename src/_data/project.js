module.exports = function() {
  return {
    environment: process.env.ELEVENTY_ROOT || "mydevelopment"
  };
};