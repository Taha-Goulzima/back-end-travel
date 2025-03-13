const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign({user}, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
  };
  const deCoderToken = async (token)=>{
    console.log(token);
    return await jwt.verify(token, process.env.JWT_SECRET);
  }
  module.exports = {generateToken, deCoderToken} ;
