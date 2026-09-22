import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, CircularProgress } from "@mui/material";
import { Edit2, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSeletor } from "../services/helper/redux";
import { deleteBlog } from "../store/slices/blog.slice";
import { toast } from "sonner";

const BlogTable = ({ setIsEdit, setOpen, blogData }) => {
  const { loading, error } = useAppSeletor((state) => state.blog);
  const dispatch = useAppDispatch();
console.log("blogdata", blogData)
  const handleBlogDelete = async (id: string) => {
    try {
      const response = await dispatch(deleteBlog(id)).unwrap();
      if (response.data.success === true) {
        toast.message(response.data.message);
      }
    } catch (error) {
      toast.error(error as string);
    }
  };


  return (
    <>
      <TableContainer
        style={{
          padding: "10px",
          border: "1px solid #e5e7eb",
          backgroundColor: "#faf5ff",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          borderRadius: "12px",
        }}
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                style={{ fontWeight: "bold", fontSize: "20px" }}
              >
                #
              </TableCell>
              <TableCell
                align="center"
                style={{ fontWeight: "bold", fontSize: "20px" }}
              >
                Title
              </TableCell>
              <TableCell
                align="center"
                style={{ fontWeight: "bold", fontSize: "20px" }}
              >
                Content
              </TableCell>

              <TableCell style={{ fontWeight: "bold", fontSize: "20px" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          {error.getBlog && (
            <p className="text-center text-red-500">{error.getBlog}</p>
          )}
          {loading.getBlog ? (
            <div className="ml-[500px] p-6">
              <CircularProgress size={40} />
            </div>
          ) : blogData.length === 0 ? (
            <p className="text-center text-red-500 p-5">Blog not found</p>
          ) : (
            <TableBody>
              {blogData?.map((row) => (
                <TableRow
                  key={row?._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <img
                      src={row?.blog_image}
                      className="h-14 w-14 rounded-md"
                      alt="blog"
                    />
                  </TableCell>
                  <TableCell align="center">{row?.title}</TableCell>
                  <TableCell align="center">{row?.content}</TableCell>

                  <TableCell
                    align="left"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "15px",
                      paddingLeft: "150px",
                    }}
                  >
                    <Button
                      // disabled={deleteUserId === row._id}
                      variant="contained"
                      color="success"
                      onClick={() => {
                        setIsEdit(row?._id);
                        setOpen(true);
                      }}
                    >
                      {loading.blogUpdate ? (
                        <CircularProgress size={24} />
                      ) : (
                      <Edit2 />
                      )}
                    </Button>

                    <Button
                      // disabled={deleteUserId === row._id}
                      variant="contained"
                      color="error"
                      onClick={() => handleBlogDelete(row?._id)}
                    >
                      {loading.blogDelete ? (
                        <CircularProgress size={24} />
                      ) : (
                      <Trash2 />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
};

export default BlogTable;
