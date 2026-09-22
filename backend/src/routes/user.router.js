const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware')
const userController = require('../controller/user.controller')


router.get("/users",authMiddleware.verifyToken, authMiddleware.roleCheck("admin"),userController.getAllUser)
router.delete("/users/:id",authMiddleware.verifyToken, authMiddleware.roleCheck("admin"),userController.deleteUser)

module.exports = router