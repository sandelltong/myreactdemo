const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(
    "/api",
    proxy({
      target: process.env.REACT_APP_API_URL || 'http://localhost:5000',
      changeOrigin: true
    })
  );
};