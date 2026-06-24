import { configureStore } from '@reduxjs/toolkit'
import userSlice from "./slices/userSlice"
import adminSlice from "./slices/adminSlice"

export const store = configureStore({
  reducer: {
    user: userSlice,
    admin: adminSlice,
  },
})

