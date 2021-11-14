module.exports = app=>{
    const auctions = require('../controllers/auctions.controller.js');
    
var router = require("express").Router();

    // Add a new item to the list..
    router.post("/new-auction", auctions.addNewAuction);

    // View existing auctions..
    router.get("/list-auctions", auctions.listAuctions);

    app.use('/auctions', router);
};