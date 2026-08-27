import React from "react";
import MainInput from "../../Components/UI/MainInput";

function EngineSpecComponent() {
  return (
    <div>
      <div className=" mt-4 mb-2">
        <strong>Engine Specification</strong>
        <hr style={{ margin: "0" }} />
      </div>
      <MainInput label="Engine CC" placeholder="Eg 1000cc" />
    </div>
  );
}

export default EngineSpecComponent;
