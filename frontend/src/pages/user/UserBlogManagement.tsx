import { useEffect, useState } from "react";
import BlogDialog from "../../components/BlogDialog";
import { Button } from "@mui/material";
import BlogTable from "../../components/BlogTable";
import { getMyBlog } from "../../store/slices/blog.slice";
import { useAppDispatch, useAppSeletor } from "../../services/helper/redux";
const UserBlogManagement = () => {
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(null);
  const dispatch = useAppDispatch();
   const { myBlogs, blogDeleteById } = useAppSeletor((state) => state.blog);
  

  useEffect(() => {
    dispatch(getMyBlog());
  }, [dispatch]);
  return (
    <>
      <div className="p-5">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold ">All Users</h2>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add Blog+
          </Button>
        </div>
        <BlogDialog
          open={open}
          blogData={myBlogs}
          setOpen={setOpen}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
      </div>
      <div>
        <BlogTable blogData={myBlogs} blogDeleteById={blogDeleteById} setIsEdit={setIsEdit} setOpen={setOpen} />
      </div>
    </>
  );
};

export default UserBlogManagement;
