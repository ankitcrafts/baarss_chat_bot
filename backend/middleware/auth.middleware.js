import jwt from "jsonwebtoken";
import redisClient from "../services/redis.service.js";

// Created Middleware
export const authUser = async (req, res, next) => {
  try {    
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).send({  message: "Unauthorized User: Token is missing" });
    }

    const isBLacklisted = await redisClient.get(token);

    if (isBLacklisted) {
      res.cookie('token', '');

      return res.status(401).send({ message: "Unauthorized User: Token is blacklisted" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized User: Invalid or expired token"  });
  }
};
