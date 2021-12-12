const db        = require("../models/auctions.model")   // Same as index
//const {Auctions}  = require("../models/auctions.model");
const mongoose  = require('mongoose');
const Auctions  = require('./../models/auctions.model')//mongoose.model('Auctions');
const Users     = require('./../models/users.model')//mongoose.model('Users');
const slugify   = require('slugify')

exports.addNewAuction =  (request, response)=>{
    // Get the data..
    const {auctionTitle, categories, auctionSecurity, description, auctionImagesURL, 
        launchOn, closingOn, bidPrice, maxBidAmount} = request.body;

        //const userId = request.user._id;
    // Create a new item..
    //auction.create({
    var auction = new Auctions({
        auctionTitle    : auctionTitle, 
        categories      : categories,
        auctionSecurity : auctionSecurity, 
        description     : description, 
        auctionImagesURL: auctionImagesURL, 
        publishDate     : new Date(),
        launchOn        : launchOn,
        closingOn       : closingOn, 
        bidPrice        : bidPrice, 
        maxBidAmount    : maxBidAmount, 
        slug            : slugify(auctionTitle, {
                                lower: true,
                                strict: true,                   // If any invalid characters(;, :, ?...) appears, it removes..
                            })
    });
    
    // Attach the host to the new auction..
    auction.hostedBy.push(request.cookies["userID"]);
    // Save the newly created auction..
    auction.save(error=>{
        if(error)
            response.send("Error in hosting a new auction. \nDetailed description: "+error);
        response.json({status: 'Done'})
    });
    
    // Reference the newly created auction to its host too..
    Users.findById(request.cookies["userID"], (error, host)=>{      // here for understanding purpose, denoting "user" as "host"
        if(error)
            return response.json({error: "Unable to assign newly created auction Id to its host. \nDetailed description: "+error})
        // upon success...
        host.auctionsHosted.push(auction);      // setting his/her newly created auction to hosted array (So, that can refer all his/her hosted auctions)
        // Now, after this update.. save back..
        host.save((error=>{
            if(error)
                response.json({error: "Error occured in setting created auctionId to his/her list. \nDetailed Description: "+error});
            return response.json({status: "Done"});
        }))
        .catch(error=>{response.json({error:error})});
    })        


    // .then(()=>{
    //     console.log("[INFO]"+"New Auction registered successfully");
    //     response.redirect(`/auctions/${this.slug}`); --------------- take this feature..
    // })
    // .catch((error)=>{
    //     if(error)
    //         response.status(400).json({error:error});
    //         console.log("[ERROR]"+error);
    // })

}

exports.listAuctions = /*async*/ (request, response)=>{
    // query for retrieving all the documents
    const query = {};

    const options = {
      // sort returned documents in ascending order by bidPrice (A->Z)
      //sort: { bidPrice: 1 },

      // Include only the `auctionTitle` in each returned document
      //projection: {_id: 0, auctionTitle: 1, connect.listCollections().toArray(function(err, names) {   

    };
    const filter={
        auctionTitle:1, bidPrice:1
    }

    Auctions.find(query, filter)
        .then((items)=>{
            if(!items)  
                throw new Error('No documents found in collection');
            else{   
                console.log(items);
                items.forEach(item=>{
                    console.log(item.auctionTitle);
                })
                console.log(Object.keys(items));
                console.log(typeof Object.values(items));
                //response.json(JSON.stringify(item));
                //response.json(item);
            }
        })
        .catch(error=>{
            console.log(error)
        });
};


exports.displayAuction = async (request, response)=>{
    //response.send("[INFO]"+request.params.slug);
    const auction = await Auctions.findOne({
         slug: request.params.slug});
    //
    //response.json(auction);
     if (auction == null)    // Find a way to convey user, that particular auction has not found.. may be we may need to use the concept of "next()"-- try finding out..
         response.redirect('/')      // If not found any auction, re-direct to home page of articles
    // // when found..
    // Also find, who hosted that auction..
    console.log("Host of auction: "+auction.hostedBy);
    Users.findById(auction.hostedBy[0], (error, host)=>{
        if(error)
            response.json({error: error})
        response.render('auctions/displayAuction', {auction: auction, auctioneer: host})
    })
    
    //response.send("About to send its respective page, please wait..!!");
}

exports.launchLiveCountdown = async (request, response) =>{
    const auction = await db.auctions.findOne({
        slug: request.params.slug});
   //
   //response.json(auction);
    if (auction == null)    // Find a way to convey user, that particular auction has not found.. may be we may need to use the concept of "next()"-- try finding out..
        response.redirect('/')      // If not found any auction, re-direct to home page of articles
   // // when found..
   response.render('auctions/launchLiveCountdown', {auction: auction})
   //response.render('auctions/displayAuction', {auction: auction})
   //response.send("About to send its respective page, please wait..!!");
}