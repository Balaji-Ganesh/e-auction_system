module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        username: {                         // Way of logging in to the site..
          type: String,
          required: [true, 'Who is registering/logging in?'],
          minLength: [5, "Should be atleast 5 to avoid redundancy. Got {VALUE}"],
          unique: [true, 'Already another user registered with this {VALUE}']
        },
        password: {
          type:String,
          required: [true, 'Password is must to ensure security']
        },
        contactName:{
          type:String,
          minLength: [2, "Is your name truly of 2 letters?, Give >2"],
          required: [true, 'How shall we call you? - Set your name']
        },
        email:{                                             // validation needed
          type:String,
          required: [true, 'How shall we contact you?']
        },
        mobileNumber:{
          type: String,                               // validation needed -- how about different countries ? or shall we keep it simple
          required: [true, "How to contact you?"]
        },
        avatarImgURL:{              // Try finding a way to upload images, till then URLs of the images
          type:String
        },
        address:{
          type:{
            city:{type:String},
            state:{type:String},
            country: {type:String},
            zipcode: {type:Number}
          },
          required:[true, "Where do you stay?"]
          
          //maxLength: [400, 'Please be clear about your address']
        },
        auctionsParticipatedIn:[{
          type: mongoose.Schema.Types.ObjectId,
          ref: "auctions"
        }],
        auctionsHosted:[{
          type: mongoose.Schema.Types.ObjectId,
          ref: "auctions"
        }],
      },
      { timestamps: true }
    );
    const Users = mongoose.model("users", schema);
    return Users;
  };
  