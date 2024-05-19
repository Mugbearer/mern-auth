const User = require("../models/user");

exports.register = async (req, res, next) => {
  const usernameExists = await User.findOne({ username: req.body.username });
  const emailExists = await User.findOne({ email: req.body.email });

  if (usernameExists) {
    return res.status(403).json({
      error: "Username is taken",
    });
  }
  if (emailExists) {
    return res.status(403).json({
      error: "Email is taken",
    });
  }

  const user = new User(req.body);
  await user.save();

  return res.status(201).json({
    message: "Signup Successful! Please Login to proceed",
  });
};
