import React from "react";
import MainInput from "../../components/MainInput";

function ManageVehicleAdditionalInfoComponent() {
  return (
    <div
      style={{ display: "grid", gap: "15px", gridTemplateColumns: "1fr 1fr" }}
    >
      <div className="d-flex flex-column">
        <div>
          <strong>Engine Specification</strong>
          <hr />
        </div>
        <MainInput label={"Engine CC"} />
        <MainInput label={"Battery Capacity"} />
        <MainInput label={"Motor Type"} />
        <MainInput label={"Maximum Power"} />
        <MainInput label={"Maximum Torque"} />
      </div>
      <div className="d-flex flex-column">
        <strong>Dimensions</strong>
        <hr />
        <MainInput label={"Dimensions (L x W x H)"} />
        <MainInput label={"Tyre Size"} />
        <MainInput label={"Wheel base"} />
        <MainInput label={"Boot space"} />
        <MainInput label={"Turning Radius"} />
        <MainInput label={"Ground Clearence"} />
      </div>
    </div>
  );
}

export default ManageVehicleAdditionalInfoComponent;
