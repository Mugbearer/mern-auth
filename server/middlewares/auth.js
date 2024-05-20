const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  let accessToken = req.cookies.jwt;

  if (!accessToken) {
    return res.status(403).json({
      error: "Unauthorized",
    });
  }

  let payload;
  try {
    req._id = jwt.verify(accessToken, process.env.JWT_SECRET)._id;
    next();
  } catch (err) {
    return res.status(403).json({
      error: "Unauthorized",
    });
  }
};
