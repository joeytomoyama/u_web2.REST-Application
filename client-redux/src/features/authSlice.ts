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

// export const setTokenAsync = createAsyncThunk(
//   "auth/setTokenAsync",
//   async (token: string, { dispatch }) => {
//     const encodedExpiresAt = token.split(".")[1]
//     const expiresAt = JSON.parse(atob(encodedExpiresAt))
//     const currentTimestamp = Math.floor(Date.now() / 1000)
//     const timeLeft = (expiresAt.exp - currentTimestamp) * 1000
//     console.log(timeLeft)

//     // Wait for the token to expire
//     await new Promise((resolve) => setTimeout(resolve, timeLeft))

//     // Dispatch the clearToken action
//     dispatch(clearToken())
//   },
// )

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
