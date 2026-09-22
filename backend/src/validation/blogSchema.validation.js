const Joi = require("joi");

class BlogSchema {
  static blogCreation = Joi.object({
    title: Joi.string()
      .trim()
      .min(5)
      .max(150)
      .pattern(/^[A-Za-z0-9\s"',.()?&#@!;:]+$/)
      .required()
      .messages({
        "string.empty": "Blog title is required",
        "string.pattern.base":
          "Blog title can contain letters, numbers, spaces and basic punctuation",
        "string.min": "Blog title must be aleast 5 characters",
        "string.max": "Blog title cannot exceed 150 characters",
        "any.required": "Blog title is required",
      }),
    content: Joi.string()
      .trim()
      .pattern(/^[A-Za-z0-9\s"',.()?&#@!;:]+$/)
      .required()
      .messages({
        "string.empty": "Blog content is required",
        "string.pattern.base":
          "Blog content can contain letters, numbers, spaces and basic punctuation",
        "any.required": "Blog content is required",
      }),
  });
}
module.exports = BlogSchema;
