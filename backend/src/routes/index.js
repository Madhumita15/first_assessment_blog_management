const express = require("express");
const router = express.Router();
const userRouter = require('./auth.router')
const blogRouter = require('./blog.router')

router.use("/api/auth", userRouter)
router.use("/api", blogRouter)

module.exports = router