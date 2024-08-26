import jwt from "jsonwebtoken";

const authorizeAdmin = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    if (user.role !== "ADMIN") {
      return res.status(403).json({ message: "Access denied" });
    }

    req.user = user;
    next();
  });
};

export default authorizeAdmin;
