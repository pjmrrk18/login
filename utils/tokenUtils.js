const jwt = require("jsonwebtoken");

const token = (res, key) => {
    var uuidAccessToken = "id" + Math.random().toString(16).slice(2);
    var uuidRefreshAccessToken = "rid" + Math.random().toString(16).slice(2);

    // Create token
    const token = jwt.sign(
      { uuidAccessToken },
      key,
      {
        expiresIn: "10s",
      }
    );

    const refreshToken = jwt.sign(
      { uuidRefreshAccessToken },
      key,
      {
        expiresIn: "5h",
      }
    );

    // save user token
    res.setHeader("x-access-token", token);
    res.setHeader("x-refresh-token", refreshToken);
}

module.exports = token
