const config = require("config");
const express = require("express");
const router = express.Router();
const Login = require("../model/user");
const bcrypt = require("bcrypt");
const token = require("../utils/tokenUtils");

router.post("/login", async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await Login.findOne({ userName: email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // generate token
      token(res, config.get("myprivatekey"));

      // user
      console.log(token);
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
