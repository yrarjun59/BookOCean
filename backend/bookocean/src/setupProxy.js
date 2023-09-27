const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    'https://a.khalti.com/api/v2/', 
    createProxyMiddleware({
      target: 'http://127.0.0.1:8000', 
      changeOrigin: true,
    })
  );
};
