const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { response } = require("express");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  console.log(res);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_KEY);

      req.user = await User.findById(decoded.id);

      console.log(decoded);

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Unathorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Unathorized");
  }
});

module.exports = protect;
