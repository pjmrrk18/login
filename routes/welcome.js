const express = require("express");
const router = express.Router();
const auth = require("../middleware/middleware");

router.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});


router.post("/sample", (req, res) => {
  res.status(200).send("Hello World 🙌 ");
});

module.exports = router;
