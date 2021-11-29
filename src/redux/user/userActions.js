import axios from "axios"
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  DELETE_USER,
  ADD_USER,
  FETCH_SINGLE_USER,
  UPDATE_USER
} from "./userTypes"

export const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST
  }
}

const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  }
}

const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error
  }
}

const userDeleted = () => {
  return {
    type: DELETE_USER
  }
}

const userAdded = () => {
  return {
    type: ADD_USER
  }
}

const fetchSinleUserSuccess = user => {
  return {
    type: FETCH_SINGLE_USER,
    payload: user
  }
}

const userUpdated = () => {
  return {
    type: UPDATE_USER
  }
}

// Load users data from API
export const loadUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest())
    axios
      .get(`${process.env.REACT_APP_API_URL}/users`)
      .then(response => {
        console.log("******* Load User Data - ", response.data)
        const usersData = response.data
        dispatch(fetchUsersSuccess(usersData))
      })
      .catch(error => {
        const errorMsg = error.message
        dispatch(fetchUsersFailure(errorMsg))
        console.log(error)
      })
  }
}

// Fetch a single user
export const loadSingleUser = id => {
  debugger
  return function (dispatch) {
    dispatch(fetchUsersRequest())
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${id}`)
      .then(response => {
        console.log("******* Single  User Data - ", response.data)
        const singleUserData = response.data
        dispatch(fetchSinleUserSuccess(singleUserData))
      })
      .catch(error => {
        const errorMsg = error.message
        dispatch(fetchUsersFailure(errorMsg))
        console.log(error)
      })
  }
}

// Delete a user
export const deleteUser = id => {
  return function (dispatch) {
    dispatch(fetchUsersRequest())
    axios
      .delete(`${process.env.REACT_APP_API_URL}/users/${id}`)
      .then(response => {
        dispatch(userDeleted())
        dispatch(loadUsers())
      })
      .catch(error => {
        const errorMsg = error.message
        dispatch(fetchUsersFailure(errorMsg))
        console.log(error)
      })
  }
}

// Add a user
export const addUser = user => {
  return function (dispatch) {
    dispatch(fetchUsersRequest())
    axios
      .post(`${process.env.REACT_APP_API_URL}/users/`, user)
      .then(response => {
        dispatch(userAdded())
        dispatch(loadUsers())
      })
      .catch(error => {
        const errorMsg = error.message
        dispatch(fetchUsersFailure(errorMsg))
        console.log(error)
      })
  }
}

// Update a user
export const updateUser = (user, id) => {
  debugger
  return function (dispatch) {
    dispatch(fetchUsersRequest())
    axios
      .put(`${process.env.REACT_APP_API_URL}/users/${id}`, user)
      .then(response => {
        dispatch(userUpdated())
        dispatch(loadUsers())
      })
      .catch(error => {
        const errorMsg = error.message
        dispatch(fetchUsersFailure(errorMsg))
        console.log(error)
      })
  }
}
