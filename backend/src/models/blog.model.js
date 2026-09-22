const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
    },
    content: {
      type: String,
      trim: true,
      required: [true, "Content is required"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    blog_image: {
      type: String,
    },
    blog_public_id: {
      type: String,
    },
    isDeletedByUser:{
        type: Boolean,
        default: false
    }
  },
  {
    timestamps: true,
  },
);

const blogModel = mongoose.model("blog", blogSchema);
module.exports = blogModel;
