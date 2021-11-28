const express   = require('express')
const auctionsController  = require('../controllers/auctions.controller.js');
const router    = express.Router()     // Provides the functionality as the app.<method>('<route>, <call-back>) in server.js file, but in diff. flavour
const db        = require('./../models/index')

// If its a new auction.. route via this..
router.get("/new-auction", (request, response)=>{
    response.render('auctions/newAuction', {auction: new db.auctions});
    //response.send("New Auction page, ready to send...")
});


// Viewing an auction..
router.get('/:slug', auctionsController.displayAuction);

// When creating a new auction.. 
router.post('/', auctionsController.addNewAuction);
// router.post('/', (request, response)=>{
//     //console.log(response.json());
//     response.json(response);
// });

// for live auction..
router.get('/goliveCountDown/:slug', auctionsController.launchLiveCountdown);


// View existing auctions..
router.get("/list-auctions", auctionsController.listAuctions);

router.get("/test-auction", (request, response)=>{
    response.send("auctions test...");
})


router.get("/", (request, response)=>{
    response.send("Hello...!! Received request....!!");
})

module.exports = router;