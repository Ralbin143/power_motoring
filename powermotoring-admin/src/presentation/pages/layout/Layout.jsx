import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { Route, Routes } from "react-router-dom";
import HomePage from "../home/HomePage";
import ManufacturerPage from "../manufacturers/ManufacturerPage";
import VehiclesPage from "../vehicles/VehiclesPage";
import ManageVehicles from "../vehicles/ManageVehicles";

function Layout() {
  return (
    <div className="d-flex w-100">
      <Sidebar />
      <div className="d-flex flex-column w-100">
        <TopBar />
        <main
          className="h-100 w-100 p-2"
          style={{ height: "100%", width: "100%" }}
        >
          <div className="w-100 p-2">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/manufacturer" element={<ManufacturerPage />} />
              <Route path="/vehicles" element={<VehiclesPage />} />
              <Route
                path="vehicles/manage-vehicles/:id"
                element={<ManageVehicles />}
              />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
