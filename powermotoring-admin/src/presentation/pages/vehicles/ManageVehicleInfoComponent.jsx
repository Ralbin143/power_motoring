import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_MANUFACTURE_SLICE_ITEM } from "../../../data/store/Manufacturer/ManufacturerSlice";
import MainInput from "../../components/MainInput";
import {
  setVehicleCategory,
  setVehicleManufacturer,
  setVehiclePowerTrain,
  setVehicleTitle,
} from "../../../data/store/vehicles/VehicleSlice";

function ManageVehicleInfoComponent() {
  const dispatch = useDispatch();
  const { manufacturerList } = useSelector((state) => state?.manufacturer);
  const { manufacturerType, vehicleName, vehicleCategory, powerTrain } =
    useSelector((state) => state?.vehicles);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    dispatch(GET_MANUFACTURE_SLICE_ITEM());
  };

  return (
    <div className="main-card d-flex flex-column gap-2">
      <MainInput.Image />
      <MainInput.DropDown
        label={"Manufacturer"}
        value={manufacturerType}
        list={manufacturerList.map((res) => ({
          value: res?.manufacturerName,
          label: res?.manufacturerName,
        }))}
        onChange={(e) => {
          dispatch(setVehicleManufacturer(e));
        }}
      />
      <MainInput
        label={"Vehicle title"}
        value={vehicleName}
        onChange={(e) => dispatch(setVehicleTitle(e.target.value))}
      />

      <MainInput.DropDown
        label={"Vehicle Category"}
        value={vehicleCategory}
        list={[
          { label: "Hatchback", value: "Hatchback" },
          { label: "SUV", value: "SUV" },
          { label: "Sedan", value: "Sedan" },
          { label: "MPV", value: "MPV" },
          { label: "MUV", value: "MUV" },
          { label: "Commercial", value: "Commercial" },
        ]}
        onChange={(e) => {
          dispatch(setVehicleCategory(e));
        }}
      />
      <MainInput.DropDown
        label={"Power Train"}
        value={powerTrain}
        list={[
          { value: "ICE", label: "ICE" },
          { value: "Electric", label: "Electric" },
          { value: "Hybrid", label: "Hybrid" },
        ]}
        onChange={(e) => {
          dispatch(setVehiclePowerTrain(e));
        }}
      />
    </div>
  );
}

export default ManageVehicleInfoComponent;
