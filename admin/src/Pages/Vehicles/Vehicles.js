import { Breadcrumbs, Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import VehiclePageLoader from "../../Components/Loaders/VehiclePageLoader";
import { instance } from "../../Const/ApiHeader";
import { ALL_VEHICLE } from "../../Const/ApiConst";

function Vehicles() {
  const [viewType, setViewType] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [vehicleList, setVehicleList] = useState([]);

  const viewGrid = () => {
    setViewType("grid");
  };
  const viewList = () => {
    setViewType("list");
  };

  const loadVehicles = async () => {
    setLoading(true);
    instance
      .get(ALL_VEHICLE)
      .then((response) => {
        setLoading(false);
        setVehicleList(response.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb" className="mb-3">
        <Link to="/" underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography>Vehicles</Typography>
      </Breadcrumbs>
      <Link to="/add_vehicles">
        <Button variant="contained" color="primary">
          Add Vehicle
        </Button>
      </Link>
      <div className="mt-4 d-flex justify-content-between align-items-center">
        <Form.Control
          type="search"
          style={{ width: "300px" }}
          placeholder="Search..."
        />
        <div className="d-flex align-items-center">
          <IconButton onClick={() => viewList()}>
            <ViewListIcon />
          </IconButton>
          <IconButton onClick={() => viewGrid()}>
            <ViewModuleIcon />
          </IconButton>
        </div>
      </div>
      <div
        className={
          viewType === "grid" ? "vehiclce-grid mt-4" : "vehiclce-list mt-4"
        }
      >
        {loading ? (
          <VehiclePageLoader />
        ) : (
          vehicleList.map((res, i) => (
            <Link to={"/Update_Vehicle/" + res._id}>
              <div key={i} className="card p-2 vehicle-grid-items">
                <img
                  src={res.vehicleImage}
                  alt=""
                  className="vehiclce-grid-image"
                />
                <div>
                  {res.manufacturerType} {res.vehicle_name}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Vehicles;
