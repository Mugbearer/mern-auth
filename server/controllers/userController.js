const User = require("../models/user");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.register = [
  body("username", "Username is required").trim().isLength({ min: 1 }).escape(),
  body("email", "Invalid Email")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Email is required")
    .escape()
    .isEmail(),
  body("password")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .escape()
    .isStrongPassword({
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must contain at least one uppercase, one lowercase, one number, and one special symbol"
    ),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array()[0].msg,
      });
    }

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
  }),
];
