import jwt from "jsonwebtoken";
import config from "../config";

const roleAuth = (allowedRoles) => {
  return (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if (token && token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }
    if (!token)
      return res.status(401).send("Access denied. No token provided.");

    try {
      const decodedToken = jwt.verify(token, config.JwtSecret);
      req.user = decodedToken;

      if (allowedRoles.includes(decodedToken.role)) {
        next();
      } else {
        res.status(403).send("Access denied. Insufficient role.");
      }
    } catch (ex) {
      res.status(400).send("Invalid token.");
    }
  };
};

export default roleAuth;
