import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  DELETE_USER,
  ADD_USER,
  FETCH_SINGLE_USER,
  UPDATE_USER
} from "./userTypes"

const initialState = {
  loading: false,
  users: [],
  user: {},
  error: ""
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }
    case FETCH_USERS_SUCCESS: {
      return {
        loading: false,
        users: action.payload,
        error: ""
      }
    }
    case FETCH_USERS_FAILURE: {
      return {
        loading: false,
        users: [],
        error: action.payload
      }
    }
    case DELETE_USER:
    case UPDATE_USER:
    case ADD_USER: {
      return {
        ...state,
        loading: false
      }
    }
    case FETCH_SINGLE_USER: {
      return {
        loading: false,
        user: action.payload,
        error: ""
      }
    }
    default:
      return state
  }
}

export default userReducer
