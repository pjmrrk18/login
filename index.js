const config = require("config");
const mongoose = require("mongoose");
const express = require("express");
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const welcomeRoute = require("./routes/welcome");

// Storing private key in json file
const app = express();
app.use(express.json());
if (!config.get("myprivatekey")) {
  console.log("FATAL Error: Couldn't locate private key");
  process.exit(1);
}

// Connect to MongoDb
mongoose
  .connect(
    "mongodb://saketp18:qCjyZbu20k3jPaTloLOUWn2jzRmp5LIVt0vuT5QW1rpTNCfWYov949vI3HA0YR1OnkOLYD8pItOMACDbBx04HQ==@saketp18.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@saketp18@"
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

  
// Handling routes
app.use("/api/", loginRoute);
app.use("/api/", registerRoute);
app.use("/api/", welcomeRoute);
app.use((request, response, next) => {
  response.status(404).send("Cannot find api. Please check again!");
});

app.listen(3000, () => console.log(`Listening on port 3000...`));
