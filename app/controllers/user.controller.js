const db = require("../models");  // Same as ../models/index"
const User = db.users;
const bcrypt = require("bcrypt");
const { createTokens, validateToken } = require("../components/JWT");
// Create and Save a new User
exports.create = (req, res) => {
  const { username, password, contactName,  email, mobileNumber, avatarImgURL, address} = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({         // Create the document with username and password (hashed) fields
      username    : username, 
      password    : hash, 
      contactName : contactName,  
      email       : email, 
      mobileNumber: mobileNumber, 
      avatarImgURL: avatarImgURL, 
      address     : address
    })                    // Once, registered successfully in db
      .then(() => {
        res.json("USER REGISTERED");  // normally, shown html page...but here bare bones..
      })
      .catch((err) => {
        if (err) {
          res.status(400).json({ error: err });   // 400: Server is functional, but some error with the response
        }
      });
  });
};

// Authenticate the User
exports.findOne = (req, res) => {
  
  const { username, password } = req.body;

  User.findOne({
    username: username
  }) .then(user => {
  if (!user) res.status(400).json({ error: "User Doesn't Exist" });

    const dbPassword = user.password;
    bcrypt.compare(password, dbPassword).then((match) => {
      if (!match) {   // there is a user, but the password is incorrect..
        res
          .status(400)
          .json({ error: "Wrong Username and Password Combination!" });
      } else {
        const accessToken = createTokens(user);

        /// Set the cookie..
        res.cookie("access-token", accessToken, {
          maxAge: 200 * 1000,
          httpOnly: true,     // as for the browser.. the http
        }); 

        res.json("LOGGED IN");
      }
    })
  });
};


// Navigate to the User Profile.
exports.navigation = (req, res) => {
  res.json("profile");        // in real-life, some screen and some data. But here simple string.
};