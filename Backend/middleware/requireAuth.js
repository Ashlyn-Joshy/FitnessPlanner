const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  //checking if the user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "authorization token missing" });
  }

  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.JWT_secret);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    return res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
