const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign({user}, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
  };
  const deCoderToken = async (token)=>{
    return await jwt.verify(token, process.env.JWT_SECRET);
  }
  const getRoleFromToken = async (token)=>{
    const decoded = await deCoderToken(token);
    return decoded.user.role;
    
  }
  module.exports = {generateToken, deCoderToken, getRoleFromToken} ;
