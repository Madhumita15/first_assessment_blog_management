import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, CircularProgress, Dialog } from "@mui/material";
import { Edit2, Eye, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSeletor } from "../services/helper/redux";
import { deleteBlog, getBlogId } from "../store/slices/blog.slice";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const BlogTable = ({ setIsEdit, setOpen, blogData, blogDeleteById }) => {
  const { loading, error } = useAppSeletor((state) => state.blog);
  const [openById, setOpenById] = useState<boolean>(false);
  const [productId, setProductId] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { BlogById } = useAppSeletor((state) => state.blog);
  console.log("blogdata", blogData);
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

  useEffect(() => {
    dispatch(getBlogId({ id: productId }));
  }, [dispatch, productId]);

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
              <TableCell style={{ fontWeight: "bold", fontSize: "20px" }}>
                #
              </TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "20px" }}>
                Title
              </TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "20px" }}>
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
          ) : blogData?.length === 0 ? (
            <p className="text-center text-red-500 p-5">Blog not found</p>
          ) : (
            <TableBody>
              {blogData?.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    {row.blog_image ? (
                      <img
                        src={row.blog_image}
                        className="h-14 w-14 rounded-md"
                        alt="blog"
                      />
                    ) : (
                      <div className="h-14 w-14 rounded-md flex items-center justify-center border-2 text-xl font-bold border-purple-800">
                        {row?.title?.slice(0, 2)}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.content}</TableCell>

                  <TableCell
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "15px",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => {
                        setIsEdit(row._id);
                        setOpen(true);
                      }}
                    >
                      <Edit2 />
                    </Button>

                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => {
                        setProductId(row._id);
                        setOpenById(true);
                      }}
                    >
                      <Eye />
                    </Button>

                    <Button
                      disabled={blogDeleteById === row._id}
                      variant="contained"
                      color="error"
                      onClick={() => handleBlogDelete(row?._id)}
                    >
                      {loading.blogDelete && blogDeleteById === row._id ? (
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
      <Dialog
        onClose={() => {
          setProductId(productId);
          setOpenById(false);
        }}
        aria-labelledby="customized-dialog-title"
        open={openById}
      >
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          style={{ fontWeight: "bold" }}
          id="customized-dialog-title"
        >
          Product Details
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => {
            setOpenById(false);
            setProductId(null);
          }}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers style={{ padding: "40px 60px" }}>
           <Typography gutterBottom>
            {BlogById?.blog_image ? (
              <img
                src={BlogById?.blog_image}
                className="h-52 w-52 rounded-md"
                alt="blog"
              />
            ) : (
              <div className="h-52 w-52  rounded-md flex items-center justify-center border-2 text-xl font-bold border-purple-800">
                {BlogById?.title?.slice(0, 2)}
              </div>
            )}
          </Typography>
          <Typography gutterBottom style={{fontWeight: "bold", fontSize: "20pxpx", }}>{BlogById?.title}</Typography>
          <Typography gutterBottom> {BlogById?.content}</Typography>
         
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            autoFocus
            onClick={() => {
              setProductId(null);
              setOpenById(false);
            }}
          >
            close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BlogTable;
