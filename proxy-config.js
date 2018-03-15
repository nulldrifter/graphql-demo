const target = "http://localhost:3000/graphql"; // graphQL API

const PROXY_CONFIG = {
  "/graphql": {
    target: target,
    secure: false,
    logLevel: "debug",
    changeOrigin: false,
  }
}

module.exports = PROXY_CONFIG;
