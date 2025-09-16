import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcryptjs";
import { sendWelcomeEmail, sendResetOTP } from "../utils/EmailSender.js";
import jwt from "jsonwebtoken";

// // Token generator
// const generateAccessAndRefreshToken = async (userId) => {
//   try {
//     const user = await User.findById(userId);
//     const refreshToken = user.generateRefreshToken();
//     const accessToken = user.generateAccessToken();

//     user.refreshToken = refreshToken;
//     await user.save({ validateBeforeSave: false });

//     return { accessToken, refreshToken };

//   } catch (error) {
//     throw new ApiError(500, "Something went wrong while generating tokens");
//   }
// };


// Register user
const registerUser = asyncHandler(async (req, res) => {
  const {
    fullName = "",
    email = "",
    phone = "",
    country = "",
    state = "",
    city = "",
    userType = "",
    preferredNotification = [],
    password = "",
  } = req.body;

  console.log("Incoming Registration Request:", req.body);

  if (
    [fullName, email, phone, state, city, userType, password, preferredNotification].some(
      (field) => typeof field === "string" && field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const allowedTypes = ["Residential", "Commercial", "Industrial"];
  if (!allowedTypes.includes(userType)) {
    throw new ApiError(400, "Invalid userType. Allowed: Residential, Commercial, Industrial");
  }

  const existedUser = await User.findOne({ $or: [{ email }, { phone }] });
  if (existedUser) {
    throw new ApiError(409, "Email or phone already exists");
  }

  if (
    Array.isArray(preferredNotification) &&
    preferredNotification.includes("email")
  ) {
    try {
      const mailResponse = await sendWelcomeEmail(email, fullName);
      console.log(mailResponse);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      throw new ApiError(500, "Failed to send welcome email. Registration aborted.");
    }
  }

  const user = await User.create({
    fullName: fullName.toLowerCase(),
    email,
    phone,
    country,
    state,
    city,
    userType,
    preferredNotification,
    password,
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "User creation failed");
  }  

   // create jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETE, {
      expiresIn: "7d",
    });

    // send jwt token via cookie

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully!")
  );
});






// Login user

/*
steps:
1) get user details from frontend
2) find the user by email or phone
3)check password 
4)access refresh token and access token
5)send cookie
6)user get logged in
 */
const LoginUser = asyncHandler(async (req, res) => {

  // step 01: get data from frontend
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }


  // search user exist or not 
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "User does not exist, please register");
  }

  // check password matches or not

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }

 

   // create jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETE, {
      expiresIn: "7d",
    });

    // send jwt token via cookie

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

  const loggedInUser = await User.findById(user._id).select("-password ");

  return res.status(200)   
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
         
        },
        "User logged in successfully"
      )
    );
});


// getting current user details 
const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfully"));
});


// Logout user
const LogOutUser = asyncHandler(async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.status(200).json(
      new ApiResponse(200, {}, "User logged out successfully!")
    );

  } catch (error) {
    throw new ApiError(500, "Error while logging out!");
  }
});


// sending reset otp passwerd
export  const sendResetOtp= async (req,res)=>{
  const {email}=req.body;
  if(! email){
    return res.json({success:false, message:"email is not defined"})
  }
  try {
  const user = await User.findOne({ email });
    if(!user){
      return res.json({success:false, message:"user not found"})

    }
    const otp= String(Math.floor(100000+ Math.random()*900000))

    user.resetOtp=otp
    user.resetOtpExpireAt= Date.now() + 15*60*1000

    await user.save();
    await sendResetOTP(email, otp);
    return res.json({success:true, message:"otp sent to your mail "})    
  } catch (error) {
     return res.json({success:false, message:"otp  not send "})
    
  }

}

// reset user password

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!newPassword || !otp || !email) {
    return res.json({ success: false, message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.json({ success: false, message: "OTP is not valid" });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP expired" });
    }

    // ✅ Don't hash manually — let the pre-save middleware do it
    user.password = newPassword;

    user.resetOtp = "";
    user.resetOtpExpireAt = 0;

    await user.save();

    return res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};



export { registerUser, LoginUser, LogOutUser, getCurrentUser };
