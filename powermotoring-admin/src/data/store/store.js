import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Auth/AuthSlice";
import ManufacurerReducer from "./Manufacturer/ManufacturerSlice";
import VehicleReducer from "./vehicles/VehicleSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    manufacturer: ManufacurerReducer,
    vehicles: VehicleReducer,
  },
});
