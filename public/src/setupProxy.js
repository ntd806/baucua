const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {

  app.use(
    "/api/user/login",
    createProxyMiddleware({
      target: "http://localhost:3002",
      changeOrigin: true,
    })
  );

  app.use(
    "/api/user/register",
    createProxyMiddleware({
      target: "http://localhost:3002",
      changeOrigin: true,
    })
  );
  app.use(
    "/api/user/get_account",
    createProxyMiddleware({
      target: "http://localhost:3002",
      changeOrigin: true,
    })
  );
  app.use(
    "/api/user/transfers-history",
    createProxyMiddleware({
      target: "http://localhost:3002",
      changeOrigin: true,
    })
  );
  app.use(
    "/api/user/get-members",
    createProxyMiddleware({
      target: "http://localhost:3002",
      changeOrigin: true,
    })
  );
  app.use(
    "/api/user/post_edit_profile",
    createProxyMiddleware({
      target: "http://localhost:3002",
      changeOrigin: true,
    })
  );
  app.use(
    "/api/user/get_all_conversion_rate",
    createProxyMiddleware({
      target: "http://localhost:3002",
      changeOrigin: true,
    })
  );
  app.use(
    "/api/user/post_deposit",
    createProxyMiddleware({
      target: "http://localhost:3002",
      changeOrigin: true,
    })
  );
  app.use(
    "/api/user/blockUser",
    createProxyMiddleware({
      target: "http://localhost:3002",
      changeOrigin: true,
    })
  );
  app.use(
    "/api/user/setting",
    createProxyMiddleware({
      target: "http://localhost:3002",
      changeOrigin: true,
    })
  );
  app.use(
    "/api/user/update-setting",
    createProxyMiddleware({
      target: "http://localhost:3002",
      changeOrigin: true,
    })
  );
  app.use(
    "/api/user/get-user-history",
    createProxyMiddleware({
      target: "http://localhost:3002",
      changeOrigin: true,
    })
  );
  app.use(
    "/api/admin/login",
    createProxyMiddleware({
      target: "http://localhost:3002",
      changeOrigin: true,
    })
  );
  app.use(
    "/api/user/create-setting",
    createProxyMiddleware({
      target: "http://localhost:3002",
      changeOrigin: true,
    })
  );
  app.use(
    "/api/user/create-conversion_rates",
    createProxyMiddleware({
      target: "http://localhost:3002",
      changeOrigin: true,
    })
  );
};