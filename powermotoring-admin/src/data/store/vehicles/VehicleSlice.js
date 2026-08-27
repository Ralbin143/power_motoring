import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  manufacturerType: null,
  vehicleImage: null,
  vehicleName: "",
  powerTrain: "ICE",
  engine: "",
  maxPower: "",
  maxTorque: "",
  groundClearence: "",
  turningRadius: "",
  fuelTank: "",
  wheelbase: "",
  bootspace: "",
  diemention: "",
  images: [],
  variantList: [],
  milage: "",
  tyreSize: "",
  vehicleCategory: "",
};

export const VEHICLE_SLICE = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    setVehicleManufacturer: (state, action) => {
      state.manufacturerType = action.payload;
    },

    setVehicleTitle: (state, action) => {
      state.vehicleName = action.payload;
    },

    setVehiclePowerTrain: (state, action) => {
      state.powerTrain = action.payload;
    },

    setVehicleEngine: (state, action) => {
      state.engine = action.payload;
    },

    setVehicleMaxPower: (state, action) => {
      state.maxPower = action.payload;
    },

    setVehicleMaxTorque: (state, action) => {
      state.maxTorque = action.payload;
    },

    setVehicleGroundClearence: (state, action) => {
      state.groundClearence = action.payload;
    },

    setVehicleTurningRadius: (state, action) => {
      state.turningRadius = action.payload;
    },

    setVehicleFuelTank: (state, action) => {
      state.fuelTank = action.payload;
    },

    setVehicleWheelbase: (state, action) => {
      state.wheelbase = action.payload;
    },

    setVehicleBootspace: (state, action) => {
      state.bootspace = action.payload;
    },

    setVehicleDimension: (state, action) => {
      state.diemention = action.payload;
    },

    setVehicleImages: (state, action) => {
      state.images = action.payload;
    },

    setVehicleVariantList: (state, action) => {
      state.variantList = action.payload;
    },

    setVehicleMilage: (state, action) => {
      state.milage = action.payload;
    },

    setVehicleTyreSize: (state, action) => {
      state.tyreSize = action.payload;
    },

    setVehicleCategory: (state, action) => {
      state.vehicleCategory = action.payload;
    },

    resetVehicleState: () => initialState,
  },
});

export const {
  setVehicleManufacturer,
  setVehicleTitle,
  setVehiclePowerTrain,
  setVehicleEngine,
  setVehicleMaxPower,
  setVehicleMaxTorque,
  setVehicleGroundClearence,
  setVehicleTurningRadius,
  setVehicleFuelTank,
  setVehicleWheelbase,
  setVehicleBootspace,
  setVehicleDimension,
  setVehicleImages,
  setVehicleVariantList,
  setVehicleMilage,
  setVehicleTyreSize,
  setVehicleCategory,
  resetVehicleState,
} = VEHICLE_SLICE.actions;

export default VEHICLE_SLICE.reducer;
