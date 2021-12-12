const db = require("../models");  // Same as ../models/index"
const Users = require('./../models/users.model')//db.users;
const bcrypt = require("bcrypt");
const { generateAccessToken, authenticateToken } = require("../components/JWT");

// Create and Save a new User
exports.create = async (request, response) => {
  console.log("navigated to registration ");
  const { firstname, lastname, password, email, mobileNumber, avatarImgURL, city, state, country, zipcode} = request.body;
  
  // response.json({contactName:{
  //                 firstname:firstname, 
  //                 lastname:lastname, 
  //         } ,
  //         password: password, 
  //         email: email, 
  //         mobileNumber: mobileNumber, 
  //         avatarImgURL: avatarImgURL, 
  //         address:{
  //         city: city,
  //         state:state,
  //         country: country,
  //         zipcode: zipcode
  //   }});


  await bcrypt.hash(password, 10).then((hash) => {
    Users.create({         // Create the document with username and password (hashed) fields
      contactName :{
                      firstname : firstname, 
                      lastname  : lastname
                    },
      password    : hash, 
      email       : email, 
      mobileNumber: mobileNumber, 
      avatarImgURL: avatarImgURL, 
      address     : {
                      city: city,
                      state: state,
                      country: country,
                      zipcode: zipcode              
                    }
    })                                      // Once, registered successfully in db
      .then(() => {
        //response.json("USER REGISTERED");   // normally, shown html page...but here bare bones..
        response.render("users/login");     // find  a way to display a toast message- - that, user is registerd successfully
      })
      .catch((err) => {
        if (err) {
          response.status(400).json({ error: err });   // 400: Server is functional, but some error with the response
        }
      });
  });
};

// Authenticate the User
exports.findOne = (request, response) => {
  console.log("Came to login an user..")
  const { email, password } = request.body;

  Users.findOne({
    email: email
  }) 
  .then(user => {
    if (!user) response.status(400).json({ error: "User Doesn't Exist" });

    const dbPassword = user.password;
    bcrypt.compare(password, dbPassword).then((match) => {
      if (!match) {                     // there is a user, but the password is incorrect..
        response
          .status(400)
          .json({ error: "Wrong Username and Password Combination!" });
      } 
      else {
        obj = {email: email, password: password};
        const accessToken = generateAccessToken(obj);  // Currently its active time is 20s (for dvlpmnt.. later update it)
        console.log("Generated Access token: "+accessToken);
        /// Set the cookie..
        response.cookie("access-token", accessToken, {
          maxAge: 10 * 60 * 1000,     // this is 10 minutes, 2 hours :2 * 60 * 60 * 1000 - not that its ms,                          // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Update the cookie time
          httpOnly: true,     // as for the browser.. the http
        }); 
        response.cookie("Name", user.firstname+" "+user.lastname);
        response.cookie("userID", user._id);      // the unique id given by mongodb
        // better.. adding in headers..  -- able to access here.. after setting, but couldn't in some other page (like new auction)
        // request.user = {
        //   name: user.firstname+" "+user.lastname,
        //   _id : user._id
        // };
        //console.log("Check:"+request.user._id);
        response.json("LOGGED IN");
        // display the home page -- with that user's name on the top-right, like Amazon, flipkart... and a dropdown box like github,...
      }
    })
  })//.catch(error=>{response.send("User not found. Please check your credentials and try again.")});
};


// Navigate to the User Profile.
exports.navigation = (req, response) => {
  res.json("profile");        // in real-life, some screen and some data. But here simple string.
};

























// testing purpose..
exports.testRegister = (request, response)=>{
  response.send("test registration")
}
exports.testLogin = (request, response)=>{
  response.send("test login")
}