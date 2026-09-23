const httpStatusCode = require("../utils/httpstatusCode");
const User = require("../models/user.models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require('../config/cloudinaryConfig')


class AuthController {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      const existingEmail = await User.findOne({ email: email });
      if (existingEmail) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Email already exist",
        });
      }

      const salt = 10;
      const hashPassword = await bcryptjs.hash(password, salt);

      const newUser = new User({
        name: name,
        email: email,
        password: hashPassword,
      });

      if (req.file) {
        // consol.log(req.file);
        newUser.profile_image = req.file.path;
        newUser.profile_public_id = req.file.filename;
      }

      await newUser.save();
      return res.status(httpStatusCode.CREATED).json({
        success: true,
        message: "User created account successfully!",
      });
    } catch (error) {
        await cloudinary.uploader.destroy(req.file.filename)
      return res.status(httpStatusCode.SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "User not found",
        });
      }

      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Invalid Credentials",
        });
      }

      const accessToken = jwt.sign(
        {
          _id: user._id,
          role: user.role,
        },
        process.env.JWT_ACCESS_SECRET_KEY,
        { expiresIn: "7d" },
      );

      const refreshToken = jwt.sign(
        {
          _id: user._id,
          role: user.role,
        },
        process.env.JWT_REFRESH_SECRET_KEY,
        { expiresIn: "30d" },
      );

      user.refreshToken = refreshToken;
      await user.save();
      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Login successfully!",
        accessToken: accessToken,
        refreshToken: refreshToken,
        data: {
          _id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          profile_image: user.profile_image,
        },
      });
    } catch (error) {
      return res.status(httpStatusCode.SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  async generateRefreshToken(req, res) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(httpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "Refresh token is not provided",
      });
    }

    const decode = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET_KEY,
    );

    const user = await User.findById(decode._id);

    if (!user) {
      return res.status(httpStatusCode.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.refreshToken !== refreshToken) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Refresh token is invalid",
      });
    }

    const newAccessToken = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      process.env.JWT_ACCESS_SECRET_KEY,
      { expiresIn: "7d" },
    );

    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "New access token generated",
      newAccessToken,
    });
  } catch (error) {
    return res.status(httpStatusCode.UNAUTHORIZED).json({
      success: false,
      message: error.message,
    });
  }
}

  async logout(req, res) {
    try {
      const id = req.user._id;
      const user = await User.findById(id);
      if (!user) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "User not found",
        });
      }

      user.refreshToken = null;
      await user.save();
      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Logout Successfully!",
      });
    } catch (error) {
      return res.status(httpStatusCode.SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }


  
}

module.exports = new AuthController();
