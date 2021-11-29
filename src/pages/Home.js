import React, { useEffect } from "react"
import { styled } from "@mui/material/styles"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { useSelector, useDispatch } from "react-redux"
import { deleteUser, loadUsers } from "../redux/user/userActions"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import { useNavigate } from "react-router-dom"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}))

const Home = () => {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.users)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(loadUsers())
  }, [])

  // Handle delete method
  const handleDelete = id => {
    if (window.confirm("Are you sure want to delete a user?")) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <div>
      <Container fixed>
        <Box sx={{ mt: "40px" }}>
          <Button
            color="primary"
            variant="contained"
            style={{ marginBottom: "20px" }}
            onClick={() => navigate("/add-user")}
          >
            ADD USER
          </Button>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                  <StyledTableCell align="center">Contact</StyledTableCell>
                  <StyledTableCell align="center">Address</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData.loading ? (
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row" colSpan="5">
                      <h2
                        style={{
                          marginTop: "0px",
                          marginBottom: "0px",
                          textAlign: "center",
                          fontSize: "14px"
                        }}
                      >
                        Loading...
                      </h2>
                    </StyledTableCell>
                  </StyledTableRow>
                ) : userData &&
                  userData.users &&
                  userData.users.length === 0 ? (
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row" colSpan="5">
                      <h2
                        style={{
                          marginTop: "0px",
                          marginBottom: "0px",
                          textAlign: "center",
                          fontSize: "14px"
                        }}
                      >
                        No Records Found
                      </h2>
                    </StyledTableCell>
                  </StyledTableRow>
                ) : (
                  userData &&
                  userData.users &&
                  userData.users.map(user => (
                    <StyledTableRow key={user.id}>
                      <StyledTableCell component="th" scope="row">
                        {user.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user.email}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user.contact}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user.address}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          color="success"
                          style={{ marginRight: "5px" }}
                          variant="outlined"
                          className="crud-button"
                          onClick={() => navigate(`/add-user/${user.id}`)}
                        >
                          Edit
                        </Button>
                        <Button
                          color="error"
                          variant="outlined"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </div>
  )
}

export default Home
