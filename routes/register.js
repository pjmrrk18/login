const config = require("config");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Login = require("../model/user");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    // Check if user already exist in our database
    const oldUser = await Login.findOne({ userName: email });
    console.log(oldUser);
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //  Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await Login.create({
      first_name: first_name,
      last_name: last_name,
      userName: email, // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      config.get("myprivatekey"),
      {
        expiresIn: "2h",
      }
    );

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
