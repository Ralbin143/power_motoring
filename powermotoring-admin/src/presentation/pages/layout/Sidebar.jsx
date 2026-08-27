import { CarRental, HomeOutlined, LocalCarWash } from "@mui/icons-material";
import logo from "../../../assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "white",
        height: "100vh",
        padding: "20px",
        borderRight: "1px solid #dadada",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <img src={logo} style={{ width: "200px" }} />

      <aside className="d-flex gap-3 flex-column mt-4">
        <div
          className={`d-flex gap-2 ${pathname === "/" ? "aside-item-active" : "aside-item"}`}
          onClick={() => navigate("/")}
        >
          <HomeOutlined />
          <div>Home</div>
        </div>
        <div
          className={`d-flex gap-2 ${pathname === "/manufacturer" ? "aside-item-active" : "aside-item"}`}
          onClick={() => navigate("/manufacturer")}
        >
          <LocalCarWash />
          <div>Brands</div>
        </div>
        <div
          className={`d-flex gap-2 ${pathname === "/vehicles" ? "aside-item-active" : "aside-item"}`}
          onClick={() => navigate("/vehicles")}
        >
          <CarRental />
          <div>Vehicles</div>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
