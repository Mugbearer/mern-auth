const User = require("../models/user");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

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

  asyncHandler(async (req, res) => {
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

exports.login = [
  body("email").trim().isLength({ min: 1 }).escape().isEmail(),
  // body("password").trim().isLength({ min: 6 }).escape().isStrongPassword({
  //   minUppercase: 1,
  //   minLowercase: 1,
  //   minNumbers: 1,
  //   minSymbols: 1,
  // }),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(401).json({
        error: "Invalid Credentials",
      });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        error: "Invalid Credentials",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("jwt", token, { expire: new Date() + 9999, httpOnly: true });

    const { username } = user;
    return res.json({
      message: "Login Successful!",
      username,
    });
  }),
];

exports.logout = async (req, res) => {
  res.clearCookie("jwt");

  return res.json({
    message: "Logout Successful!",
  });
};

exports.getLoggedInUser = (req, res) => {
  const { username } = req.user;

  return res.status(200).json({
    message: "User is still logged in",
    username,
  });
};
