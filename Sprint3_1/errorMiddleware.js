import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

// Middleware to authenticate token
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(`[${new Date().toISOString()}] Auth Header: ${authHeader}`);
  const token = authHeader && authHeader.split(" ")[1];
  console.log(`[${new Date().toISOString()}] TokenInErrorMidWare: ${token}`);

  if (!token) {
    console.log("Token not provided");
    return res.sendStatus(401); // If there is no token, return 401
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    console.log("Token verified. Payload:", decoded);
    next();
  } catch (error) {
    console.log("Invalid token.");
    res.status(400).json({ error: "Invalid token." });
  }
};

// Middleware to check if user is admin
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    console.log("User is not an admin:", req.user);
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  console.log("Admin access granted:", req.user);
  next();
};

export const handleServerError500 = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging (optional)
  res.status(500).send("Something went wrong!");
};

export default handleServerError500;
