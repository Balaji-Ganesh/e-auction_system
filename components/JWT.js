require('dotenv').config()
const jwt= require("jsonwebtoken");
const db = require("../models");  // Same as ../models/index"
const User = db.users;


let refreshTokens = [];         // normally stored in server's database, and refreshed at each restart..


//// from the micro project... done with ref: WebDevSimplified
function generateAccessToken(user){
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'}); // for testing useing small duration, but at real-time, prefer some larger..
}


function authenticateToken(request, response, next){
  /// Get the token and verify.. -- it will be in the header..
  const accessToken = request.cookies['access-token']; 
  const userId      = request.cookies['userID']; 
  console.log({userId:userId, accessToken: accessToken});
  
  // console.log("At authentication: token is: "+accessToken);

  if (!accessToken) // If no access token at all (i.e., not logged in. If would, cookie would come along with it..)
    return response.status(400).json({ error: "User not Authenticated!" });    // than saying, not authorized, we'll redirect: a more polite way
  
  // token is there.. but needs to be verified.. 
  try {
    // By now, we had a valid token.. its time to verify..
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, user)=>{
      if(error) return response.sendStatus(403)   // To indicate: received a token, but its invalid.

    // by now had a valid token..
    request.user = user;         // place in the request..
    request.authenticated = true; // adding the extra field. (by default its false)
    console.log("User successfully authenticated");
    return next();
  })
  }
  catch (error) {
    return response.status(400).json({ error: error });
  }
  // Update feature:
  // When user is found to be not authenticated, along with the response...find a way to open the sign up page...
}

module.exports = { generateAccessToken, authenticateToken };
