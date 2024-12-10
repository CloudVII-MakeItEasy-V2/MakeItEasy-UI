const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/seller/register',
    createProxyMiddleware({
      target: 'https://seller-dot-coms4153-cloud-computing.ue.r.appspot.com',
      changeOrigin: true
    })
  );
};
