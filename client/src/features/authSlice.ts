import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../app/store"
import { UserType } from "../types"

interface AuthState {
  token: string | undefined
  isAuthenticated: boolean
  isAdministrator: boolean
  body: undefined | UserType
  status: "idle" | "loading" | "failed"
  // status: "authenticated" | "not authenticated" | "loading"
  error: string | undefined
  showAuthModal: boolean
}

const initialState: AuthState = {
  token: undefined,
  isAuthenticated: false,
  isAdministrator: false,
  body: undefined,
  status: "idle",
  error: undefined,
  showAuthModal: false,
}

export const authenticateAsync = createAsyncThunk(
  "auth/authenticateAsync",
  async (credentials: { username: string; password: string }) => {
    // const response = await fetch("https://localhost/api/authenticate", {
    const response = await fetch(
      import.meta.env.VITE_SERVER_URL + "authenticate",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(
            `${credentials.username}:${credentials.password}`,
          )}`,
        },
      },
    )
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
          try {
            state.body = JSON.parse(
              atob(action.payload.split(".")[1]),
            ) as UserType
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
