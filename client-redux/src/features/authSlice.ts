import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

interface AuthState {
  token: string | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      state.isAuthenticated = true
      //   setTokenAsync(action.payload)
    },
    clearToken: (state) => {
      state.token = null
      state.isAuthenticated = false
    },
  },
})

export const { setToken, clearToken } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer
