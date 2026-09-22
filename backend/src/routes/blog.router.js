const express = require("express");
const router = express.Router();
const blogController = require("../controller/blog.controller");
const blogSchemaValidation = require("../validation/blogSchema.validation");
const validation = require("../validation/index");
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../utils/cloudinary");
const httpStatusCode = require("../utils/httpstatusCode");




const uploadMiddleware = (req, res, next) => {
  upload.single("blog_image")(req, res, (err) => {
    if (err) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        stats: false,
        message: err.message,
      });
    }
    next();
  });
};

router.post(
  "/blogs",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("user", "admin"),
  uploadMiddleware,
  validation.validate(blogSchemaValidation.blogCreation),
  blogController.createBlog,
);

router.get(
  "/blogs",
  blogController.getAllBlogs,
);

router.get(
  "/blogs/:id",
  blogController.getBlogById,
);


router.put(
  "/blogs/:id",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("user", "admin"),
  uploadMiddleware,
  validation.validate(blogSchemaValidation.blogCreation),
  blogController.updateBlog,
);

router.delete(
  "/blogs/:id",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("user", "admin"),
  blogController.deleteBlog,
);
module.exports = router;
