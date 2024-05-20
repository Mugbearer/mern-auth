const User = require("../models/user");

const asyncHandler = require("express-async-handler");

exports.userById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req._id);

  console.log(req._id);

  if (!user) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  req.user = user;

  next();
});
