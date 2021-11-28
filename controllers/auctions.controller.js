const db        = require("../models")   // Same as index
const auction   = db.auctions;
const slugify   = require('slugify')

exports.addNewAuction =  (request, response)=>{
    // Get the data..
    const {auctionTitle, categories, auctionSecurity, description, auctionImagesURL, 
        launchOn, closingOn, bidPrice, maxBidAmount} = request.body;

    // Create a new item..
    auction.create({
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
    })
    .then(()=>{
        console.log("[INFO]"+"New Auction registered successfully");
        response.redirect(`/auctions/${this.slug}`);
    })
    .catch((error)=>{
        if(error)
            response.status(400).json({error:error});
            console.log("[ERROR]"+error);
    })

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

    auctions.find(query, filter)
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
    const auction = await db.auctions.findOne({
         slug: request.params.slug});
    //
    //response.json(auction);
     if (auction == null)    // Find a way to convey user, that particular auction has not found.. may be we may need to use the concept of "next()"-- try finding out..
         response.redirect('/')      // If not found any auction, re-direct to home page of articles
    // // when found..
    response.render('auctions/displayAuction', {auction: auction})
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