import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { addUser, loadSingleUser, updateUser } from "../redux/user/userActions"
import { useNavigate, useParams } from "react-router-dom"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles({
  root: {
    width: "700px"
  }
})

const AddUser = () => {
  const [state, setstate] = useState({
    name: "",
    email: "",
    contact: "",
    address: ""
  })
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const classes = useStyles()
  const params = useParams()
  const { name, email, contact, address } = state
  const { user } = useSelector(state => state.users)

  const handleChange = e => {
    let { name, value } = e.target
    setstate({ ...state, [name]: value })
  }

  // Use Effect Function
  useEffect(() => {
    if (params && params.id) {
      let userID = Number(params.id)
      dispatch(loadSingleUser(userID))
    }
  }, [])

  // To set forms data
  useEffect(() => {
    if (user) {
      setstate({ ...user })
    }
  }, [user])

  // Submit a form
  const handleSubmit = e => {
    e.preventDefault()
    if (!name || !email || !contact || !address) {
      setError("Please enter all input fields value!")
    } else {
      params.id
        ? dispatch(updateUser(state, params.id))
        : dispatch(addUser(state))
      navigate("/")
    }
  }

  return (
    <div>
      <div>{params.id ? <h3>Edit User</h3> : <h3>Add User</h3>}</div>
      <hr />

      <form
        className={classes.root}
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Name"
          variant="standard"
          value={name || ""}
          type="text"
          onChange={handleChange}
          name="name"
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="standard"
          value={email || ""}
          type="email"
          onChange={handleChange}
          name="email"
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Contact"
          variant="standard"
          value={contact || ""}
          type="text"
          onChange={handleChange}
          name="contact"
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Address"
          variant="standard"
          value={address || ""}
          type="text"
          onChange={handleChange}
          name="address"
        />
        <br />
        {error && <h4 className="error">{error}</h4>}
        <Button
          color="primary"
          variant="contained"
          style={{ width: "150px", marginRight: "10px" }}
          type="submit"
        >
          {params.id ? "UPDATE" : "SUBMIT"}
        </Button>
        <Button
          color="primary"
          variant="contained"
          style={{ width: "150px" }}
          type="button"
          onClick={() => navigate("/")}
        >
          Back
        </Button>
      </form>
    </div>
  )
}

export default AddUser
