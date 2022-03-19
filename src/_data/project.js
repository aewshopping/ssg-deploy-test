module.exports = function() {
  return {
    environment: process.env.MY_ENVIRONMENT || "mydevelopment"
  };
};