import { LoadingButton } from "@mui/lab";
import {
  Breadcrumbs,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { IoIosSave } from "react-icons/io";
import { Link } from "react-router-dom";

function ModifyVehicle() {
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb" className="mb-3">
        <Link to="/" underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link to="/vehicles" underline="hover" color="inherit" href="/">
          Vehicles
        </Link>
        <Typography>Update Vehicles</Typography>
      </Breadcrumbs>
      <div className="section">
        <div className="mb-2">
          <strong>Vehicle Details</strong>
        </div>
        <div className="add_vehicle_container">
          <TextField size="small" label="Vehicle Name" />
          <TextField size="small" label="Varient" />
          {/* <TextField size='small' label="Vehicle Name" /> */}
        </div>
      </div>
      <div className="section">
        <div className="text-secondary mt-4">
          <strong>Engine Specification</strong>
        </div>
        <div>
          <FormControl>
            <FormControl className="text-secondary">Engine Type</FormControl>
            <input type="text" className="form-control" />
            <select>
              <option>ICE</option>
              <option>Electric</option>
              <option>Hybrid</option>
            </select>
          </FormControl>
        </div>
        <hr className="mt-1 mb-1" />
        <div className="add_vehicle_container">
          <FormControl>
            <FormControl className="text-secondary">
              Engine Size (CC){" "}
            </FormControl>
            <input type="text" className="form-control" />
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">Maximum Power </FormControl>
            <input type="text" className="form-control" />
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Maximum Torque{" "}
            </FormControl>
            <input type="text" className="form-control" />
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Ground Clearence{" "}
            </FormControl>
            <input type="text" className="form-control" />
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Turning Radius{" "}
            </FormControl>
            <input type="text" className="form-control" />
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Fuel Tank Capacity{" "}
            </FormControl>
            <input type="text" className="form-control" />
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary"> Wheel base </FormControl>
            <input type="text" className="form-control" />
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary"> Boot space </FormControl>
            <input type="text" className="form-control" />
          </FormControl>

          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Diemention (L x W x H){" "}
            </FormControl>
            <input type="text" className="form-control" />
          </FormControl>
        </div>
        <div className="text-secondary mt-4">
          <strong>Infotainment System</strong>
        </div>
        <hr className="mt-1 mb-1" />
        <div className="add_vehicle_container">
          <FormControl>
            <FormControl className="text-secondary"> Radio </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary"> Music system </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              USB And Auxiliary Input{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Bluetooth Connectivity{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary"> Touch Screen </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Touch Screen Size{" "}
            </FormControl>
            <input type="text" className="form-control" />
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary"> Android Auto </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Apple Car Play{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Number Of Speaker{" "}
            </FormControl>
            <input type="number" className="form-control" />
          </FormControl>
        </div>

        <div className="text-secondary mt-4">
          <strong>Interior</strong>
        </div>
        <hr className="mt-1 mb-1" />

        <div className="add_vehicle_container">
          <FormControl>
            <FormControl className="text-secondary">Power Steering</FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Power Windows Front{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Power Windows Rear{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Low Fuel Warning Light{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Accessory Power Outlet{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Vanity Mirror{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Rear Seat Headrest{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Seat Lumbar Support{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Steering mounted controls{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Rear Parking sensors{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Foldable Rear Seat{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Engine Start Stop Button{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Bottle Holder{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary"> USB Charger </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Gear Shift Indicator{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Driver side window Auto UP/DOWN{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary"> AC </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Tilt steering{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              KeyLess Entry{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary"> Tachometer </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary"> Trip Metre </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Seat Upholstery{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Height Adjustable Driver Seat{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="text-secondary mt-4">
          <strong>Exterior</strong>
        </div>
        <hr className="mt-1 mb-1" />
        <div className="add_vehicle_container">
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Head lights type{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary"> Fog lights </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Power Adjustable Exterior Rear View Mirror{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Electric Folding Rear View Mirror{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Rear Window Wiper{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Rear Window Washer{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Rear Window Defogger{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary"> Wheel Covers </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary"> Alloy Wheels </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Outside Rear View Mirror Turn Indicators{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="text-secondary mt-4">
          <strong>Safety</strong>
        </div>
        <hr className="mt-1 mb-1" />
        <div className="add_vehicle_container">
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Anti Lock Braking System{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Central Locking{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Child Safety Locks{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Anti Theft Alarm{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Driver Airbag{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Passenger Airbag{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Day Night Rear View Mirror{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Rear Seat Belts{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Seat Belt Warning{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Door Ajar Warning{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Engine Immobilizer{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary"> EBD </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Electronic Stability Control{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary"> Speed Alert </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Speed Sensing Auto Door Lock{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Pretensioners And Force Limiter Seatbelts{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary"> Hill Hold </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormControl className="text-secondary">
              {" "}
              Impact Sensing Auto Door Unlock{" "}
            </FormControl>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      <div className="text-center mt-4 mb-4">
        <LoadingButton
          variant="contained"
          style={{ width: "250px" }}
          startIcon={<IoIosSave />}
        >
          Update
        </LoadingButton>
      </div>
    </div>
  );
}

export default ModifyVehicle;
