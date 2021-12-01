const { createProxyMiddleware } = require("http-proxy-middleware");
const BASE_URL = process.env.BASE_URL;

module.exports = function (app) {

  app.use(
    "/api/user/login",
    createProxyMiddleware({
      target: `${BASE_URL}`,
      changeOrigin: true,
    })
  );

  app.use(
    "/api/user/register",
    createProxyMiddleware({
      target: `${BASE_URL}`,
      changeOrigin: true,
    })
  );
  app.use(
    "/api/user/get_account",
    createProxyMiddleware({
      target: `${BASE_URL}`,
      changeOrigin: true,
    })
  );
  app.use(
    "/api/user/transfers-history",
    createProxyMiddleware({
      target: `${BASE_URL}`,
      changeOrigin: true,
    })
  );
  app.use(
    "/api/user/get-members",
    createProxyMiddleware({
      target: `${BASE_URL}`,
      changeOrigin: true,
    })
  );
  app.use(
    "/api/user/post_edit_profile",
    createProxyMiddleware({
      target: `${BASE_URL}`,
      changeOrigin: true,
    })
  );
  app.use(
    "/api/user/get_all_conversion_rate",
    createProxyMiddleware({
      target: `${BASE_URL}`,
      changeOrigin: true,
    })
  );
  app.use(
    "/api/user/post_deposit",
    createProxyMiddleware({
      target: `${BASE_URL}`,
      changeOrigin: true,
    })
  );
  app.use(
    "/api/user/blockUser",
    createProxyMiddleware({
      target: `${BASE_URL}`,
      changeOrigin: true,
    })
  );
  app.use(
    "/api/user/setting",
    createProxyMiddleware({
      target: `${BASE_URL}`,
      changeOrigin: true,
    })
  );
  app.use(
    "/api/user/update-setting",
    createProxyMiddleware({
      target: `${BASE_URL}`,
      changeOrigin: true,
    })
  );
  app.use(
    "/api/user/get-user-history",
    createProxyMiddleware({
      target: `${BASE_URL}`,
      changeOrigin: true,
    })
  );
  app.use(
    "/api/admin/login",
    createProxyMiddleware({
      target: `${BASE_URL}`,
      changeOrigin: true,
    })
  );
  app.use(
    "/api/user/create-setting",
    createProxyMiddleware({
      target: `${BASE_URL}`,
      changeOrigin: true,
    })
  );
  app.use(
    "/api/user/create-conversion_rates",
    createProxyMiddleware({
      target: `${BASE_URL}`,
      changeOrigin: true,
    })
  );
};