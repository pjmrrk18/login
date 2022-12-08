const jwt = require("jsonwebtoken");
const configKey = require("config");
const config = require("config");
const tokenGenerator = require("../utils/tokenUtils");

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  const refreshToken =
    req.body.token || req.query.token || req.headers["x-refresh-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  const accessTokenError = {};
  const refreshTokenError = {};
  try {
    jwt.verify(token, configKey.get("myprivatekey"));
  } catch (err) {
    accessTokenError.isError = true;
    accessTokenError.error = err;
  }

  try {
    jwt.verify(refreshToken, configKey.get("myprivatekey"));
  } catch (err) {
    refreshTokenError.isError = true;
    refreshTokenError.error = err;
  }

  if (refreshToken.isError && accessTokenError.isError) {
    return res.status(401).send("Invalid Token");
  }

  if(accessTokenError.isError && !refreshTokenError.isError) {
    tokenGenerator(res, config.get("myprivatekey"));
  }

  return next();
};

module.exports = verifyToken;
