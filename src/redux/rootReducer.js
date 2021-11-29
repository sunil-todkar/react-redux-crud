import { combineReducers } from "redux"
import userReducers from "./user/userReducer"

const rootReducer = combineReducers({
  users: userReducers
})

export default rootReducer
