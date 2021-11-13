Let's add tabs like:
* Explore Auctions,
* Want to Auction?
* Buy a product/service...
* How it works?
* FAQ-- https://www.copart.com/how-it-works/

For displaying the image:
	Displaying the images from various angles.. -- can take help of SwiperJS


Terminologies..
* **Auctioneer**  - the one who wants to make an auction
	- taken from [4]
* **Bidder**      - be a participant/member of an auction		
	- taken from [1]

--on 19th September, 2021 ~ Monday.
Explore some other websites and find out..
	[6]

***
***




**Tabs**
* Participate _as like in the [2]_	



***
***
# **UI's _(views)_**
***
***

# Home Page _(Landing Page)_
* Let's keep it like the mixture of [2] and [1]
* Adding the flowcharts -- as like [Img001.4]






# Participation _(Registration)_
> Making a gateway for a new user (either Bidder or auctioneer)
> ~~ ***Registration*** for a new user.
* Bidder Enrollment
	* Organize the filling details as like [1.1]
	* of course, not that many fields, but a very minimal of that.


## In coming versions..
* Displaying path in each page.
	(Like we have for a "File" in the file explorer) -- try [1], Bidder Enrollment.
	Demo: [Img001.1]
* Adding article on showing the procedure.
	* Like, [4.1]











# Explore Auctions
> Shows all the auctions, categorized by date format (Initially). i.e., **Previous auctions**, **current auctions** (on-going), **future auctions** (Auctions coming up)


* Mix the UI shown by @Shivraj <br/>
					+	[1.2] -- had the filter -- and pretty good UI (refer to [Img001.5])<br/>
					+	[5.1] -- List View

## In coming versions
* Toggling views (Grid and card)
	* like the case in Google drive
	* Coming our section, 
		* [5.1] for List view
		* [4] for card view.
* Introducing the filter criteria
* Introducing the  filter of categorizing by, 
	- status of auction -- closed, open, ...











# Viewing an Auction
* UI as like [5] -- a more detailed + elegant view.
			 [Img002.1] -- for a minimal interface.
* Additional properties of bid. Go to [5.2] > Bid Details _(Tab)_









# Questions to be disscused...
1. Shall we have a separate format of login for bidder and auctioneer?
	- if a login id for each. This even serves us the facility of **updating, retrieiving, accessing randomly** easily.
	- else, we need to have to separate collections. And moreover, we need to make it in GUI too.
2. What can one auction -- _Speaking generally_??
	- Real estate
		- Like, HMDA(Telangana) ... look [2]
	- Auto Mobiles
		- Look at [3]
	- Industrial Equipments
		- look at [4]
	- _ans taken from [6]_
3. How shall we **design the logic of bidding..??**
	* Go to _Bidding Details_ tab in [5.2]
		* It also contains **Types of bidding**.
	* For now, let's go with simple bidding logic.
		* **Flat Bid** -- refer to above point for definition of it.


## **Conclusion**:
> To keep UI simple, and to integrate all the required options together... [1] eauction.gov.in is a good choice.
>	* But, curently we should not focus on that level -- as it diverts our flow, but should have that view while design. 
***
***
# **Implementation views..**
***
***
## Database perspecitve
Let's maintain these collections......
* For an auction: _(let's keep attributes as...)_
	* `auctionId`
	* `auctionTitle`
	* `publishDate`<sup>**</sup>
	* `closingDate`<sup>**</sup>
				<br/>--- taken from [1.2]
	* `timeRemaining`<sup>##</sup> -- calculate via JS, w.r.t. currentTime of system.
	* `bidders`: Let's keep this as an array, which contains all the id's of the bidders. And show the length of the array here.
	* `maxLimit`<sup>#</sup>
	* `currentHighBid`<sup>##</sup>
	* `status`(boolean)<sup>##</sup><br/>
	-- taken from [5.2], BiddingDetails _tab_.
	* `photo` -- single or multiple ..??
		* shall we have a online link? -- all user's can't.
		* Upload the files.
			* Store it in separte folder -- mgmt becomes difficult.
			* Storing in database itself. -- Hoping that, this is the good way.

* For a user _(let's keep attributes as...)_
	* `userName` -- decide.. either this or `loginID`
	* `password`
	* `contactName`
	* `avatarImage` -- in database itself..?? hope so
	* `email`
	* `DOB`
	* `mobileNumber`
	* `address`:{
		`city`, `state`, `country`, `zipcode`}  -- let's store as a dictionary.
	* `auctionsParticipatedIn`: Let's have an array of `auctionId`'s, he/she participated in. -- Like Foreign Key. Display #count in their profile.
	* `auctionsHosted`
	

**Let's store the time in UNIX Time format. Calculation is easy, as `Integer` format.<br/>



## **An Issue**
> Shall we keep, bidders and auctioneers separate??
> * If yes, need to handle separate UI
> * Let's keep it simple. 
>	* Like whatsapp, every one can host and participate. -- seems, that's a elegant way.


### **Legend**
#Optional for now.<br/>
##To be implemented via JS.





***
***
# **Flow..**
***
***
* User persepective
> Registration > Viewing Auctions --_clicking_some_auction_--> View Details of that auction > Bid with some valid amount > Wait for auction deadline > Announce results.

**Give a **Note to the user**: He/She need to regularly visit the site, so that, he is on top. Else, other might take over.

-- this option gives us the solution to challenge-1.

## **Challenges**
1. How shall we terminate, suspend.. track the end of auctions. i.e.,
	* We don't have server, which at regular periods, visits all the running auctions and make appropriate changes.
	* **solution** Refer to the above "Note to the user".
		* Each time, they refresh the page of "Explore Auctions" or "specific auction page".. our page reloads right, then we need to get the details from Db right....
			* So, at this time we validate it, and
				* Make change in DB
				* display it.




























***
***
***
***
## Lookup sites 
* [1] [e-auction India Home page](https://eauction.gov.in/eauction/#/)
	* [1.1]  [Bidder Enrollement](https://eauction.gov.in/eAuction/app?page=CorporateTenderer_Registration&service=page)
	* [1.2] [Searching Auctions](https://eauction.gov.in/eAuction/app)
* [2] [HMDA-Telangana e-auctions](http://auctions.hmda.gov.in/)
* [3] [Copart](https://www.copart.com)
* [4] [BidSpotter](https://www.bidspotter.com/en-us)
	* [4.1] [BidSpotter-How To Buy](https://support.bidspotter.com/hc/en-gb/articles/115000787834-How-To-Buy) 
* [5] [GSA auctions](https://gsaauctions.gov/)
	* [5.1] [GSA auctions > Search Results](https://gsaauctions.gov/gsaauctions/aucindx/)  HomePage > All Categories (tab)
	* [5.2] [Some auction details](https://gsaauctions.gov/gsaauctions/aucalsrh/?sl=ZEATL921128302) _Make sure to look at the various tabs._
* [6] [Investopedia--best-auction-websites](https://www.investopedia.com/best-online-auction-websites-5114546)






## Reference Snap shots
* [Img001] eauction.gov.in
	* [Img001.1] eauction.gov.in_BidderEnrollment.png
	* [Img001.2] eauction.gov.in_path_showing.png
	* [Img001.3] eauction.gov.in_LoginView.png
	* [Img001.4] eauction.gov.in_showing_flow_of_auction.png
	* [Img001.5] eauction.gov.in_showing_Auctions.png
* [Img002] BidSpotter.com
	* [Img002.1] BidSpotter-viewing_an_auction.png








## Current Status
* Done with basic static pages 
	- that too not fully ready and functional.

# Today(13th Nov, 2021 ~ Saturday_2)
* Make the db schemas, insert some test data -- via ThunderClient
	* then go for UI.
via eJS, as done in WebDevSimplified, Markdown blog.
