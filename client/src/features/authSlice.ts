import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

interface AuthState {
  token: string | undefined
  isAuthenticated: boolean
  isAdministrator: boolean
  status: "idle" | "loading" | "failed"
  error: string | undefined
}

const initialState: AuthState = {
  token: undefined,
  isAuthenticated: false,
  isAdministrator: false,
  status: "idle",
  error: undefined,
}

export const authenticateAsync = createAsyncThunk(
  "auth/authenticateAsync",
  async (credentials: { username: string; password: string }) => {
    const response = await fetch("https://localhost/api/authenticate", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(
          `${credentials.username}:${credentials.password}`,
        )}`,
      },
    })
    console.log(response)

    if (response.status === 200) {
      const token: string = response.headers
        .get("Authorization")
        ?.split(" ")[1] as string
      return token
    } else {
      throw new Error("Authentication failed")
    }
  },
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearToken: (state) => {
      state.token = undefined
      state.isAuthenticated = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(
        authenticateAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "idle"
          state.token = action.payload
          state.isAuthenticated = true
          try {
            state.isAdministrator = JSON.parse(
              atob(action.payload.split(".")[1]),
            ).isAdministrator
          } catch (error) {
            console.error(error)
          }
        },
      )
      .addCase(authenticateAsync.rejected, (state, action) => {
        state.status = "idle"
        state.error = action.error.message
      })
  },
})

export const { clearToken } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer
