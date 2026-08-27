import React from "react";
import MainInput from "../../components/MainInput";
import { useDispatch, useSelector } from "react-redux";
import { setManuFacturerTitle } from "../../../data/store/Manufacturer/ManufacturerSlice";
import MainButtons from "../../components/MainButtons";

function ManageManufacturer() {
  const dispatch = useDispatch();
  const { title, image } = useSelector((state) => state?.manufacturer);

  const saveAction = () => {
    console.log(";");
  };

  return (
    <div className="d-flex flex-column gap-3">
      <MainInput.Image />
      <MainInput
        label={"Name"}
        value={title}
        onChange={(e) => {
          dispatch(setManuFacturerTitle(e.target.value));
        }}
      />
      <MainButtons label={"Save"} onClick={saveAction} />
    </div>
  );
}

export default ManageManufacturer;
