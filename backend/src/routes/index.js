const express = require("express");
const router = express.Router();
const authRouter = require('./auth.router')
const blogRouter = require('./blog.router')
const userRouter = require('./user.router')

router.use("/api/auth", authRouter)
router.use("/api", blogRouter)
router.use("/api", userRouter)

module.exports = router