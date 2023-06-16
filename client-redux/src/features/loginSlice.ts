import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

const initialState = {
  isLoggedIn: false,
}

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true
    },
    logout: (state) => {
      state.isLoggedIn = false
    },
  },
})

export const { login, logout } = loginSlice.actions

export const selectLogin = (state: RootState) => state.login.isLoggedIn

export default loginSlice.reducer
