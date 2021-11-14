// Import the dependecncies
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require("./app/components/JWT");

// Connect the middle-wares (done via "app.use(..)")
//   -- via this, request comes and 
app.use(cookieParser());
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {   // when promise gets fulfilled..
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require("./app/routes/user.routes")(app);   // HigherOrderFunction, app object obeys the routes..

require("./app/routes/auctions.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});