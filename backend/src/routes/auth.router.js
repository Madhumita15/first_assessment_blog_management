const express = require("express");
const router = express.Router();
const userController = require('../controller/auth.controller')
const userSchemaValidation = require('../validation/userSchema.validation')
const validation = require('../validation/index');
const httpStatusCode = require("../utils/httpstatusCode");
const authMiddleware = require('../middleware/auth.middleware')
const upload = require('../utils/cloudinary')


const uploadMiddleware = (req, res, next)=>{
  upload.single("profile_image")(req, res, (err)=>{
    if(err){
      return res.status(httpStatusCode.BAD_REQUEST).json({
        stats: false,
        message: err.message
      })
    }
    next()
  })
}


router.post("/register", uploadMiddleware, validation.validate(userSchemaValidation.register), userController.register)
router.post("/login", validation.validate(userSchemaValidation.login), userController.login)
router.post("/logout", authMiddleware.verifyToken, userController.logout)
router.post("/refresh-token", authMiddleware.verifyToken, userController.generateRefreshToken)



module.exports = router