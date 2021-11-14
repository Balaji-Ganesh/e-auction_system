const { sign, verify } = require("jsonwebtoken");
const config = require("../config/db.config");
key=config.secret;
const createTokens = (user) => {
  const accessToken = sign(
    { username: user.username },
    key
  );

  return accessToken;
};

// next is the way: if this goes fine, handed to next...
const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];// name of the cookie.. now it contains the JWT token sign

  if (!accessToken) // If no access token at all (i.e., not logged in. If would, cookie would come along with it..)
    return res.status(400).json({ error: "User not Authenticated!" });    // than saying, not authorized, we'll redirect: a more polite way

    // token is there.. but needs to be verified.. 
  try {
    const validToken = verify(accessToken, key);
    if (validToken) {
      req.authenticated = true;   // adding the extra field. (by this its false)
      return next();              // take it forward.. like Kho-Kho game..
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = { createTokens, validateToken };
