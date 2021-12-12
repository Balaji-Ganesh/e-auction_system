require("dotenv").config()
const express   = require('express')
const usersController = require("../controllers/user.controller.js");
const router    = express.Router()     // Provides the functionality as the app.<method>('<route>, <call-back>) in server.js file, but in diff. flavour
//const db        = require('./../models/index');
const { authenticateToken } = require("../components/JWT");
const Users = require("../models/users.model.js");

// Display the login page.. -- later update: if already login.. navigate to home page..
router.get("/", (request, response)=>{
    response.render("users/login");
})

// For authentication..
// router.post("/signIn", (request, response)=>{
//     response.send("test sign in");
// });
router.post("/signIn", usersController.findOne);

// For new registrations..
router.post("/signUp", usersController.create);


 router.get("/profile", authenticateToken, (request, response)=>{
//router.get("/profile", (request, response)=>{
    // const accessToken = request.cookies['access-token']; 
    //console.log("Received token: "+accessToken);
    Users.findById(request.cookies["userID"], (error, user)=>{
        if(error)
            response.json({error: error});
        console.log(user);
        var user = user;
    
    console.log(user);
    response.render('users/viewProfile', {user: user, 
                                         auctionsHostedLen: user.auctionsHosted.length, 
                                         auctionsParticipatedInLen : user.auctionsParticipatedIn.length
                                        });
    });
});

// may be we  need override module to work on this.. or for now, put it as GET
router.delete('/logout', (request, response)=>{
    refreshTokens = refreshTokens.filter(token => token!== request.body.token)
    response.sendStatus(204);   // Sucessful
})

module.exports = router;





















// module.exports = app => {
//     const users = require("../controllers/user.controller.js");
//     const { validateToken } = require("../components/JWT");

//     var router = require("express").Router();   // Instantiate the route
  
  
//     // Create a new user
//     router.post("/register", users.create);

//     // authenticate the user
//     router.post("/login", users.findOne);

//     // Provide the way to login or register..
//     router.get("/", (request, response)=>{
//         response.send("hello signin");
//         //response.render("users/login");
//     })
    
//     // navigate to a user profile
//     router.get("/profile",validateToken, users.navigation);
//     router.use('/users', router);
// };