const { createProxyMiddleware } = require("http-proxy-middleware");
const BASE_URL = process.env.BASE_URL;

module.exports = function (app) {

  app.use(
    "/user/login",
    createProxyMiddleware({
      target: `${BASE_URL}`,
      changeOrigin: true,
    })
  );

  app.use(
    "/user/register",
    createProxyMiddleware({
      target: `${BASE_URL}`,
      changeOrigin: true,
    })
  );
  app.use(
    "/user/get_account",
    createProxyMiddleware({
      target: `${BASE_URL}`,
      changeOrigin: true,
    })
  );
  app.use(
    "/user/transfers-history",
    createProxyMiddleware({
      target: `${BASE_URL}`,
      changeOrigin: true,
    })
  );
  app.use(
    "/user/get-members",
    createProxyMiddleware({
      target: `${BASE_URL}`,
      changeOrigin: true,
    })
  );
  app.use(
    "/user/post_edit_profile",
    createProxyMiddleware({
      target: `${BASE_URL}`,
      changeOrigin: true,
    })
  );
  app.use(
    "/user/get_all_conversion_rate",
    createProxyMiddleware({
      target: `${BASE_URL}`,
      changeOrigin: true,
    })
  );
  app.use(
    "/user/post_deposit",
    createProxyMiddleware({
      target: `${BASE_URL}`,
      changeOrigin: true,
    })
  );
  app.use(
    "/user/blockUser",
    createProxyMiddleware({
      target: `${BASE_URL}`,
      changeOrigin: true,
    })
  );
  app.use(
    "/user/setting",
    createProxyMiddleware({
      target: `${BASE_URL}`,
      changeOrigin: true,
    })
  );
  app.use(
    "/user/update-setting",
    createProxyMiddleware({
      target: `${BASE_URL}`,
      changeOrigin: true,
    })
  );
  app.use(
    "/user/get-user-history",
    createProxyMiddleware({
      target: `${BASE_URL}`,
      changeOrigin: true,
    })
  );
  app.use(
    "/admin/login",
    createProxyMiddleware({
      target: `${BASE_URL}`,
      changeOrigin: true,
    })
  );
  app.use(
    "/user/create-setting",
    createProxyMiddleware({
      target: `${BASE_URL}`,
      changeOrigin: true,
    })
  );
  app.use(
    "/user/create-conversion_rates",
    createProxyMiddleware({
      target: `${BASE_URL}`,
      changeOrigin: true,
    })
  );
};