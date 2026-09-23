const httpStatusCode = require("../utils/httpstatusCode");
const Blog = require("../models/blog.model");
const cloudinary = require("../config/cloudinaryConfig");

class BlogController {
  async createBlog(req, res) {
    try {
      const { content, title } = req.body;
      const id = req.user._id;
      console.log("content1");
      // console.log(content, title)

      const newBlog = new Blog({
        content: content,
        title: title,
        author: id,
      });

      if (req.file) {
        newBlog.blog_image = req.file.path;
        newBlog.blog_public_id = req.file.filename;
      }

      const data = await newBlog.save();
      if (!data) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Blog not created",
          data: null,
        });
      } else {
        return res.status(httpStatusCode.CREATED).json({
          success: true,
          message: "Blog created Successfully!",
          data: data,
        });
      }
    } catch (error) {
      if (req.file) {
        await cloudinary.uploader.destroy(data.blog_public_id);
      }
      return res.status(httpStatusCode.SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAllBlogs(req, res) {
    try {
      const data = await Blog.find({isDeletedByUser: false });
      if (!data) {
        return res.status(httpStatusCode.OK).json({
          success: true,
          message: "Blog not found",
          data: [],
        });
      } else {
        return res.status(httpStatusCode.OK).json({
          success: true,
          message: "Blog fetched successfully!",
          data: data,
        });
      }
    } catch (error) {
      return res.status(httpStatusCode.SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getBlogById(req, res) {
    try {
      const id = req.params.id;
      const data = await Blog.findOne({ _id: id });
      if (!data) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Blog not found",
          data: null,
        });
      } else {
        return res.status(httpStatusCode.OK).json({
          success: true,
          message: "Blog fetched successfully!",
          data: data,
        });
      }
    } catch (error) {
      return res.status(httpStatusCode.SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }


  
  async getMyBlog(req, res) {
    try {
      const id = req.user._id;
      const data = await Blog.find({ author: id, isDeletedByUser: false });
      if (!data) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Blog not found",
          data: [],
        });
      } else {
        return res.status(httpStatusCode.OK).json({
          success: true,
          message: "Blog fetched successfully!",
          data: data,
        });
      }
    } catch (error) {
      return res.status(httpStatusCode.SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateBlog(req, res) {
    try {
      const { content, title } = req.body;
      const userId = req.user._id;
      const blogId = req.params.id;
      const role = req.user.role;

      let data;
      if (role === "admin") {
        data = await Blog.findById(blogId);
      } else {
        data = await Blog.findOne({
          _id: blogId,
          author: userId,
        });
      }

      if (!data) {
        if (req.file) {
          await cloudinary.uploader.destroy(req.file.filename);
        }

        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message:
            role === "admin"
              ? "Blog not found"
              : "Blog is not found or you are not the author of this blog",
        });
      }
      if (content !== undefined) {
        data.content = content;
      }

      if (title !== undefined) {
        data.title = title;
      }

      if (req.file) {
        if (data.blog_public_id) {
          await cloudinary.uploader.destroy(data.blog_public_id);
        }
        data.blog_image = req.file.path;
        data.blog_public_id = req.file.filename;
      }

      await data.save();

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Blog updated successfully!",
        data: data,
      });
    } catch (error) {
      if (req.file) {
        await cloudinary.uploader.destroy(req.file.filename);
      }

      return res.status(httpStatusCode.SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteBlog(req, res) {
    try {
      const userId = req.user._id;
      const blogId = req.params.id;
      const role = req.user.role;

      if (role === "admin") {
        const data = await Blog.findByIdAndDelete(blogId);
        if (!data) {
          return res.status(httpStatusCode.NOT_FOUND).json({
            success: false,
            message: "Blog not found",
          });
        } else {
          if (data.blog_image) {
            await cloudinary.uploader.destroy(data.blog_public_id);
          }
          return res.status(httpStatusCode.OK).json({
            success: true,
            message: "Blog deleted successfully",
          });
        }
      }

      const data = await Blog.findOne({ _id: blogId, author: userId });
      if (!data) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Blog is not found or you are not the author of this blog",
        });
      }

      data.isDeletedByUser = true;
      await data.save();
      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Blog deleted successfully",
      });
    } catch (error) {
      return res.status(httpStatusCode.SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new BlogController();
