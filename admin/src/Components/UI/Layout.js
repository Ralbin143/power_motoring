import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Login from "../../Pages/Login/Login";
import Home from "../../Pages/Home/Home";
import Vehicles from "../../Pages/Vehicles/Vehicles";
import AddVehicle from "../../Pages/Vehicles/AddVehicle";
import ModifyVehicle from "../../Pages/Vehicles/ModifyVehicle";
import UpdateVehicle from "../../Pages/Vehicles/UpdateVehicle";
import Manufacturers from "../../Pages/Manufacturers/Maufacturers";
import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { IoCarSportSharp } from "react-icons/io5";
import { GoDashboard } from "react-icons/go";
import { MdPrecisionManufacturing } from "react-icons/md";
import Ripples from "react-ripples";
import RunningText from "../../Pages/RunningText/RunningText";
import Subscription from "../../Pages/Subscription/Subscription";
import { MdSubscriptions } from "react-icons/md";

function Layout() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="app-layout">
      <aside>
        <div className="text-center">
          <strong>POWER MOTORING</strong>
        </div>
        <div className="logged-user-container">
          <Avatar>N</Avatar>
          <div className="ms-2">
            <div>
              <strong>User Name</strong>
            </div>
            <div className="text-secondary">
              <small>Designation</small>
            </div>
          </div>
        </div>
        <ul className="sidebar-menu">
          <Tooltip title="Dashboard" placement="right-start">
            <span>
              <Ripples during={1000} className="w-100">
                <NavLink to="/" className="w-100">
                  <li className="p-2">
                    <GoDashboard /> Dashboard
                  </li>
                </NavLink>
              </Ripples>
            </span>
          </Tooltip>
          <Tooltip title="Vehicles" placement="right-start">
            <span>
              <Ripples during={1000} className="w-100">
                <NavLink to="/vehicles" className="w-100">
                  <li className="p-2">
                    <IoCarSportSharp /> Vehicles
                  </li>
                </NavLink>
              </Ripples>
            </span>
          </Tooltip>
          <Tooltip title="Manufacturers" placement="right-start">
            <span>
              <Ripples during={1000} className="w-100">
                <NavLink to="/manufacturers" className="w-100">
                  <li className="p-2">
                    <MdPrecisionManufacturing /> Manufacturers
                  </li>
                </NavLink>
              </Ripples>
            </span>
          </Tooltip>
          <Tooltip title="Manufacturers" placement="right-start">
            <span>
              <Ripples during={1000} className="w-100">
                <NavLink to="/running_text" className="w-100">
                  <li className="p-2">
                    <MdPrecisionManufacturing /> Runnig Text
                  </li>
                </NavLink>
              </Ripples>
            </span>
          </Tooltip>
          <Tooltip title="Manufacturers" placement="right-start">
            <span>
              <Ripples during={1000} className="w-100">
                <NavLink to="/subscriptions" className="w-100">
                  <li className="p-2">
                    <MdSubscriptions /> Subscriptions
                  </li>
                </NavLink>
              </Ripples>
            </span>
          </Tooltip>
        </ul>
      </aside>
      <div className="w-100">
        <nav className="topbar">
          <div>
            <strong>POWER MOTORING</strong>
          </div>

          <div>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  width: "200px",
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleClose}>
                <Avatar /> Profile
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </nav>
        <main>
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/vehicles" element={<Vehicles />} />
            {/* <Route path='/Update_Vehicle/:id' element={<ModifyVehicle />} /> */}
            <Route path="/Update_Vehicle/:id" element={<UpdateVehicle />} />
            <Route path="/subscriptions" element={<Subscription />} />
            <Route path="/add_vehicles" element={<AddVehicle />} />
            <Route path="/update_vehicles" element={<ModifyVehicle />} />
            <Route path="/manufacturers" element={<Manufacturers />} />
            <Route path="/running_text" element={<RunningText />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default Layout;
