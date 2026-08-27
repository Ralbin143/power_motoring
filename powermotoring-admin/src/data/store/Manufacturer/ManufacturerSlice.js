import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ManufacturerRepository from "../../repository/Manufacturer/ManufacturerRepo";

const initialState = {
  drawerState: false,
  manufacturerList: [],
  selectedId: "",
  title: "",
  image: "",
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const GET_MANUFACTURE_SLICE_ITEM = createAsyncThunk(
  "get-manufacturer",
  async (data, thunkApi) => {
    try {
      return await ManufacturerRepository.getAllManufacturers(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const MANUFACTURER_SLICE = createSlice({
  name: "manufacturer",
  initialState,
  reducers: {
    setManuFacturerDrawerState: (state, action) => {
      state.drawerState = action.payload;
    },
    setManuFacturerId: (state, action) => {
      state.selectedId = action.payload;
    },
    setManuFacturerTitle: (state, action) => {
      state.title = action.payload;
    },
    setManuFacturerImage: (state, action) => {
      state.image = action.payload;
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(GET_MANUFACTURE_SLICE_ITEM.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(GET_MANUFACTURE_SLICE_ITEM.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(GET_MANUFACTURE_SLICE_ITEM.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.manufacturerList = action.payload;
      });
  },
});

export const {
  setManuFacturerDrawerState,
  setManuFacturerId,
  setManuFacturerTitle,
  setManuFacturerImage,
} = MANUFACTURER_SLICE.actions;
export default MANUFACTURER_SLICE.reducer;
