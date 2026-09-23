import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, CircularProgress } from "@mui/material";
import { Trash2 } from "lucide-react";
import { useAppDispatch, useAppSeletor } from "../../services/helper/redux";
import { useEffect } from "react";
import { deleteUserByAdmin, getAllUser } from "../../store/slices/user.slice";
import { toast } from "sonner";

const AdminUserManagement = () => {
  const { allUsers, loading, error, deleteUserId } = useAppSeletor((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    try {
      const response = await dispatch(deleteUserByAdmin(id)).unwrap();
      if (response.data.status === true) {
        toast.success(response.data.message);
        dispatch(getAllUser());
      }
    } catch (error) {
      toast.error(error as string);
    }
  };
  return (
    <>
      <div className="p-5">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold ">All Users</h2>
        </div>
      </div>
      <div>
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
                  
                >
                  #
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontWeight: "bold", fontSize: "20px" }}
                >
                  Name
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontWeight: "bold", fontSize: "20px" }}
                >
                  Email
                </TableCell>

                <TableCell
                  align="center"
                  style={{ fontWeight: "bold", fontSize: "20px" }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            {error.allUser && (
              <p className="text-center text-red-500">{error.allUser}</p>
            )}
            {loading.allUser ? (
              <div className="ml-[500px] p-6">
                <CircularProgress size={40} />
              </div>
            ) : allUsers.length === 0 ? (
              <p className="text-center text-red-500 p-5">User not found</p>
            ) : (
              <TableBody>
                {allUsers?.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      {row.profile_image ? (
                        <img
                          src={row.profile_image}
                          className="h-14 w-14 rounded-md"
                          alt="blog"
                        />
                      ) : (
                        <div className="h-14 w-14 rounded-md flex items-center justify-center border-2 text-xl font-bold border-purple-800">
                          {row?.name?.slice(0, 2)}
                        </div>
                      )}
                    </TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>

                    <TableCell
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "15px",
                        paddingLeft: "150px",
                      }}
                    >
                      <Button
                        disabled={deleteUserId === row._id}
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(row._id)}
                      >
                        {(loading.deleteUser && deleteUserId === row._id) ? (
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
      </div>
    </>
  );
};

export default AdminUserManagement;
