import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = (req, res, next) => {
  const authToken = req.cookies.token;

  if (!authToken) {
    res.status(401).send({ error: "Please login to access this resource." });
  }

  try {
    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid Token" });
  }
};
