const db = require("../models")   // Same as index
const auctions = db.auctions;

exports.addNewAuction =  (request, response)=>{
    // Get the data..
    const {auctionTitle, categories, auctionSecurity, description, auctionImagesURL, publishDate, closingDate, bidPrice, maxBidAmount, auctionStatus} = request.body;

    // Create a new item..
    auctions.create({
        auctionTitle    : auctionTitle, 
        categories      : categories,
        auctionSecurity : auctionSecurity, 
        description     : description, 
        auctionImagesURL: auctionImagesURL, 
        publishDate     : publishDate, 
        closingDate     : closingDate, 
        bidPrice        : bidPrice, 
        maxBidAmount    : maxBidAmount, 
        auctionStatus   : auctionStatus
    })
    .then(()=>{
        response.json("New Auction registered successfully");
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
    