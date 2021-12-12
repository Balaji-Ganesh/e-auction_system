// Import the dependecncies
const express       = require("express");
const app           = express();
const bcrypt        = require("bcrypt");
const cookieParser  = require("cookie-parser");
const { createTokens, validateToken } = require("./components/JWT");
const auctionRouter = require('./routes/auctions.routes');
const userRouter   = require('./routes/user.routes');

// Connect the middle-wares (done via "app.use(..)")
//   -- via this, request comes and 
app.use(cookieParser());
const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {   // when promise gets fulfilled..
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


/**************** Making the app to use Middlewares.. */
// serving css as static..
//app.use(express.static('views'));
app.use(express.static(__dirname + "/views", {
  index: false, 
  immutable: true, 
  cacheControl: true,
  maxAge: "30d"
}));




// parse requests of content-type - application/json
app.use(express.json());
/** Setting the view engine..**/
app.set('view engine', 'ejs')


// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use('/auctions', auctionRouter);
app.use('/users', userRouter);
//require("./routes/user.routes")(app);   // HigherOrderFunction, app object obeys the routes..

//require("./routes/auctions.routes")(app);
//app.use(require('./routes/auctions.routes.js'));


/****************** Routes ***************************** */
// Render the home page -- later add the functionality like Amazon/facebook. If already login (display their name) -- use middlewares in routes..
app.get("/", (request, response)=>{
  response.render('index.ejs');
})

// If related to auctions... directo from here..
app.get("/auctions", auctionRouter);

// If related to users... direct from here..
//app.get("/users", usersRouter);
app.get("/users", userRouter);

app.get("/test", (request, response)=>{
  response.send("test");
});


// set port, listen for requests
const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
