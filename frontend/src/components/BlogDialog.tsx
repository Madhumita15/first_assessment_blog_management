import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DynamicInput from "./DynamicInput";
import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSeletor } from "../services/helper/redux";
import { toast } from "sonner";
import { blogSchema } from "../validation/blog.validation";
import { createBlog, getAllBlog, getMyBlog, updateBlog } from "../store/slices/blog.slice";
import { blogInput } from "../services/json/inputsData/blog.input";

const BlogDialog = ({ open, setOpen, isEdit, setIsEdit, blogData }) => {
  const dispatch = useAppDispatch();
  const [previewImage, setPreviewImage] = React.useState("");
  const { loading } = useAppSeletor((state) => state.blog);

  console.log("blogData", blogData)
  const {
    formState: { errors },
    register,
    reset,
    setValue,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(blogSchema),
    defaultValues: {
      content: "",
      title: "",
      blog_image: null,
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    if (data.blog_image) {
      formData.append("blog_image", data.blog_image);
    }
    try {
      if (isEdit) {
        const response = await dispatch(
          updateBlog({ data: formData, id: isEdit }),
        ).unwrap();
        console.log("response", response);
        if (response.data.success === true) {
          toast.success(response.data.message);
        }
      } else {
        const response = await dispatch(
          createBlog({ data: formData }),
        ).unwrap();
        console.log("response", response);
        if (response.success === true) {
          toast.success(response.message);
        }
      }
      reset({
        title: "",
        content: "",
        blog_image: null,
      });
      dispatch(getAllBlog());
       dispatch(getMyBlog());
      setOpen(false);
      setPreviewImage("");
    } catch (error) {
      toast.error(error as string);
    }
  };

  React.useEffect(() => {
    if (isEdit) {
      console.log(isEdit);
      const data = blogData?.find((blog) => blog?._id === isEdit);
      reset({
        title: data?.title || "",
        content: data?.content || "",
      });
      setPreviewImage(data?.blog_image);
    }
  }, [isEdit, blogData, reset]);

  return (
    <>
      <React.Fragment>
        <Dialog
          open={open}
          onClose={() => {
            setIsEdit?.(null);
            reset({
              title: "",
              content: "",
              blog_image: null,
            });
            setOpen(false);
            setPreviewImage("");
          }}
        >
          <DialogTitle
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            {isEdit ? "Update Blog" : "create Blog"}
          </DialogTitle>
          <DialogContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2 mb-5"
              id="subscription-form"
            >
              {blogInput.map((item) => (
                <DynamicInput
                  required={item.required}
                  errors={errors}
                  loading={loading.create || loading.blogUpdate}
                  register={register}
                  name={item.name}
                  type={item.type}
                  label={item.label}
                />
              ))}

              <div className="flex justify-center items-center">
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="img"
                    height={"100px"}
                    width={"100px"}
                    className="rounded-full"
                  />
                )}
              </div>

              <input
                disabled={loading.create || loading.blogUpdate}
                type="file"
                name="profile_image"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  if ((file?.size as number) > 1 * 1024 * 1024) {
                    toast.success("File size must be less than 1mb");
                    return;
                  }
                  if (file) {
                    setValue("blog_image", file, {
                      shouldValidate: true,
                    });
                    setPreviewImage(URL.createObjectURL(file));
                  }
                }}
                className={`border border-purple-700 rounded-lg p-2 text-lg w-[360px] `}
              />
            </form>
          </DialogContent>

          <DialogActions>
            <Button
              disabled={loading.create || loading.blogUpdate}
              variant="outlined"
              color="error"
              onClick={() => {
                setIsEdit?.(null);
                reset({
                  title: "",
                  content: "",
                  blog_image: null,
                });
                setOpen(false);
                setPreviewImage("");
              }}
            >
              Cancel blog
            </Button>
            <Button
              disabled={loading.create || loading.blogUpdate}
              variant="contained"
              color="success"
              type="submit"
              form="subscription-form"
              style={{ backgroundColor: "#7e22ce" }}
            >
              {loading.create || loading.blogUpdate ? (
                <CircularProgress size={24} />
              ) : isEdit ? (
                "Update blog"
              ) : (
                "create blog"
              )}
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
};
export default BlogDialog;
