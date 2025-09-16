import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    throw new ApiError(401, "Unauthorized request - No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETE);

    const user = await User.findById(decoded.id).select("-password -refreshToken");
    if (!user) {
      throw new ApiError(401, "Unauthorized request - Invalid user");
    }

    req.user = user; 
    
    next();
  } catch (error) {
  
    next(new ApiError(401, "Unauthorized request - Invalid or expired token"));
  }
});
