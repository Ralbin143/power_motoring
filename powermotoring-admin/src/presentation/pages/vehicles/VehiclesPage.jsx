import MainInput from "../../components/MainInput";
import MainButtons from "../../components/MainButtons";
import VehicleCard from "./VehicleCard";
import { useNavigate } from "react-router-dom";

function VehiclesPage() {
  const navigate = useNavigate();
  return (
    <div className="main-card">
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <MainInput.Search placeholder={"Eg. Swift"} />
        </div>
        <div style={{ width: "200px" }}>
          <MainButtons label={"Add"} />
        </div>
      </div>
      <hr />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto",
          gap: "10px",
        }}
      >
        <VehicleCard
          title={"Title"}
          date={"22-2-2026"}
          image={"SSSS"}
          onClick={() => navigate(`manage-vehicles/`)}
        />
        <VehicleCard
          title={"Title"}
          date={"22-2-2026"}
          image={"SSSS"}
          onClick={() => navigate(`manage-vehicles/222`)}
        />
        <VehicleCard title={"Title"} date={"22-2-2026"} image={"SSSS"} />
        <VehicleCard title={"Title"} date={"22-2-2026"} image={"SSSS"} />
        <VehicleCard title={"Title"} date={"22-2-2026"} image={"SSSS"} />
        <VehicleCard title={"Title"} date={"22-2-2026"} image={"SSSS"} />
        <VehicleCard title={"Title"} date={"22-2-2026"} image={"SSSS"} />
        <VehicleCard title={"Title"} date={"22-2-2026"} image={"SSSS"} />
        <VehicleCard title={"Title"} date={"22-2-2026"} image={"SSSS"} />
      </div>
    </div>
  );
}

export default VehiclesPage;
