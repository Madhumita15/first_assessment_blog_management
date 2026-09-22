
import * as yup from "yup";
export const blogSchema = yup.object({
  title: yup
    .string()
    .trim()
    .matches(
      /^[A-Za-z0-9\s"',.()?&#@!-;:]+$/,
      "Blog title can contain letters, numbers, spaces and basic punctuation",
    )
    .required("Blog title is required"),
  content: yup
    .string()
    .trim()
    .matches(
      /^[A-Za-z0-9\s"',.()?&#@!;:]+$/,
      "Blog content can contain letters, numbers, spaces and basic punctuation",
    )
    .required("Blog content is required"),
  blog_image: yup
    .mixed<File>()
    .nullable()
    .when("$isEdit", {
      is: false,
      then: (schema) => schema.required("Blog Image is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
});
