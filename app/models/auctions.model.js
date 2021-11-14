module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            auctionTitle: {
                type: String,
                required: [true, "What's the auction title? - Set some title please"]
            },
            categories:[{
                type:String,
                required: [true, 'To which category your auction comes in? - Select the category']
            }],
            auctionSecurity:{                                                                       // via radio buttons..
                type:String,
                enum: { 
                    values: ["Public", "Private"],     // Only these values are allowed
                    message: '{VALUE} is not supported'            // Mongoose replaces {VALUE} with the value being validated.
                },
                default: "Public"                
            },
            description: {                                                                          // via <textarea>
                type: String,
                default: "No description was provided by the auctioneer."
            },
            auctionImagesURL:[{            // Try finding a way to upload images, till then URLs of the images
                type:String,
            }],
            publishDate: {
                type:Date,
                required: [true, 'When this auction being hosted? - Set publishDate']
            },
            closingDate: {
                type:Date,
                required:[true, 'When you would like to end? - Set closingDate']    
            },
            hostedBy: [{                                                // Array: If multiple people want to auction. But right now, don't think of it. Just added for flexibility
                type: mongoose.Schema.Types.ObjectId,
                ref: "users",
                //required: [true, 'Who is hosting this auction?? - Set his _id']
            }],
            bidders:[{
                type: mongoose.Schema.Types.ObjectId,
                ref: "users"
            }],
            bidPrice: {
                type: Number,
                min: [1, 'Must be at least 1 rupee, got {VALUE}'],
                required: [true, 'How can you auction, without setting inital bid-price?']
            },
            maxBidAmount: {
                type: Number,
                min: [1, 'Must be at least 1 rupee, got {VALUE}']
            },
            highestBidAmount: {
                type: Number,
                default: 0
            },
            auctionStatus:{
                type:String,
                required: [true, 'What about auction status??'],
                enum: { 
                    values: ['On going', 'Ended', 'Upcoming'],      // Only these values are allowed
                    message: '{VALUE} is not supported'            // Mongoose replaces {VALUE} with the value being validated.
                }
            }
        },
        
        { timestamps: true }
    );

    const auctions = mongoose.model("auctions", schema);
    return auctions;
};
  