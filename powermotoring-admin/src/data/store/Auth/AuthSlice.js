import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../../services/auth/AuthService";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  userData: [],
  uname: "",
  password: "",
};

export const LOGIN_SLICE_ITEM = createAsyncThunk(
  "login-auth-slice",
  async (data, thunkApi) => {
    try {
      return await AuthService.AuthAction(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const AUTH_SLICE = createSlice({
  name: "auth_slice",
  initialState,
  reducers: {
    setAuthUname: (state, action) => {
      state.uname = action.payload;
    },
    setAuthPassword: (state, action) => {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LOGIN_SLICE_ITEM.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(LOGIN_SLICE_ITEM.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(LOGIN_SLICE_ITEM.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.userData = action.payload;
      });
  },
});

export const { setAuthUname, setAuthPassword } = AUTH_SLICE.actions;
export default AUTH_SLICE.reducer;
