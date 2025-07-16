const admins = require("../config/admins");

function checkAdmin(req, res, next) {
  const email = req.headers["x-user-email"];

  if (!email || !email.endsWith("@nits.ac.in") || !admins.includes(email)) {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  next();
}

module.exports = checkAdmin;
