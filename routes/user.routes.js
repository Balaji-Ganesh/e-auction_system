module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const { validateToken } = require("../components/JWT");

    var router = require("express").Router();   // Instantiate the route
  
  
    // Create a new user
    router.post("/register", users.create);

    // authenticate the user
    router.post("/login", users.findOne);

    // navigate to a user profile
    router.get("/profile",validateToken, users.navigation);
    app.use('/users', router);
};