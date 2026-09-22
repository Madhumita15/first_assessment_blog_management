import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "../store/slices/user.slice"
import blogReducer  from "../store/slices/blog.slice"

const store = configureStore({
    reducer: {
        user: userReducer,
        blog: blogReducer
    }
})
export default store