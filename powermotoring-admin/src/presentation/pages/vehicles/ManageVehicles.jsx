import { useParams } from "react-router-dom";
import MainInput from "../../components/MainInput";
import MainButtons from "../../components/MainButtons";
import ManageVehicleInfoComponent from "./ManageVehicleInfoComponent";
import ManageVehicleAdditionalInfoComponent from "./ManageVehicleAdditionalInfoComponent";
import ManageVehicleOtherDetailsComponent from "./ManageVehicleOtherDetailsComponent";

function ManageVehicles() {
  const { id } = useParams();

  console.log(id);

  return (
    <div>
      <h4>Manage Vehicle</h4>
      <hr />

      <div className="d-flex gap-3">
        <ManageVehicleInfoComponent />
        <div className="main-card">
          <ManageVehicleAdditionalInfoComponent />
        </div>
      </div>
      <div className="main-card my-3">
        <ManageVehicleOtherDetailsComponent />
      </div>
      <div className="d-flex justify-content-center mt-3">
        <div style={{ width: "200px" }}>
          <MainButtons label={"Save"} />
        </div>
      </div>
    </div>
  );
}

export default ManageVehicles;
