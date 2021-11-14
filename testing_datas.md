basic test data for auctions..
For a new auction:
    request:
        `POST: localhost:3004/auctions/new-auction`
    Body:
```JSON
{
    "auctionTitle"      :"Ambassodor Car",
    "categories"        :["vehicles"],
    "auctionSecurity"   : "Public",
    "description"       :"",
    "auctionImagesURL"  :"",
    "publishDate"       :"01-01-2022",
    "closingDate"       :"01-01-2022",
    "bidPrice"          :"10000",
    "maxBidAmount"      :"50000",
    "auctionStatus"     :"On going",
}
    Response:
        `"New Auction registered successfully"`
```
for viewing auctions:
    request:
        `GET: localhost:3004/auctions/list-auctions`
    Body: nothing



basic test data for user..
For registering:
    Request:
        `POST: localhost:3004/users/register`
    Body:

            ```JSON
            {
                "username"      :"testUser",
                "password"      :"1234",
                "contactName"   :"User Test",
                "email"         :"someone@some.com",
                "mobileNumber"  :"9876543210",
                "avatarImgURL"  :"",
                "address":{
                    "city"  :"Secunderabad", 
                    "state" :"Telangana", 
                    "country":"India", 
                    "zipcode":"500087"
                }
            }
```

For Login:
    Request:
        `POST: localhost:3004/users/login`
    Body:

        ```JSON
        {
            "username"  :"testUser",
            "password"  :"1234"
        }
        ```

Response:
    `"LOGGED IN"`


Task:
    Designing the initial version of database
    Designing the 
        * view auctions
        * user profile
        * ..