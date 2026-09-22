const httpStatusCode = require("../utils/httpstatusCode");
const User = require("../models/user.models");
const cloudinary = require("../config/cloudinaryConfig");

class UserController {
  async getAllUser(req, res) {
    try {
      const users = await User.find();
      if (!users) {
        return res.status(httpStatusCode.OK).json({
          success: true,
          message: "User not found",
          data: [],
        });
      } else {
        return res.status(httpStatusCode.OK).json({
          success: true,
          message: "User fetched successfully!",
          data: users,
        });
      }
    } catch (error) {
      return res.status(httpStatusCode.SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteUser(req, res) {
    try {
      const id = req.params.id;
      const users = await User.findByIdAndDelete(id);
      if (!users) {
        return res.status(httpStatusCode.OK).json({
          success: true,
          message: "User not found",
        });
      } else {
        if (req.file) {
          if (users.profile_image) {
            await cloudinary.uploader.destroy(users.profile_public_id);
          }
        }
        return res.status(httpStatusCode.OK).json({
          success: true,
          message: "User deleted  successfully!",
        });
      }
    } catch (error) {
      return res.status(httpStatusCode.SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new UserController();
