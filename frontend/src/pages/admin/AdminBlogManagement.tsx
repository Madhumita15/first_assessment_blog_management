

import { useEffect, useState } from "react";
import BlogDialog from "../../components/BlogDialog";
import { Button } from "@mui/material";
import BlogTable from "../../components/BlogTable";
import { useAppDispatch, useAppSeletor } from "../../services/helper/redux";
import { getAllBlog } from "../../store/slices/blog.slice";
const AdminBlogManagement = () => {
  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(null)
  const dispatch = useAppDispatch()
  const { allBlogs } = useAppSeletor((state) => state.blog);

  
    useEffect(() => {
      dispatch(getAllBlog());
      
    }, [dispatch]);
  return (
    <>
     <div className="p-5">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold ">All Users</h2>
          <Button variant="contained" onClick={()=> setOpen(true)} >Add Blog+</Button>
        </div>
        <BlogDialog open={open} setOpen={setOpen} isEdit={isEdit} setIsEdit={setIsEdit} />
      </div>
      <div>
        <BlogTable setIsEdit={setIsEdit} setOpen={setOpen} blogData={allBlogs}/>
         
      </div>
    </>
  )
}

export default AdminBlogManagement