const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/auth");
const { userById } = require("../middlewares/user");

const userController = require("../controllers/userController");

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/logout", userController.logout);

router.get(
  "/loggedInUser",
  verifyToken,
  userById,
  userController.getLoggedInUser
);

module.exports = router;
