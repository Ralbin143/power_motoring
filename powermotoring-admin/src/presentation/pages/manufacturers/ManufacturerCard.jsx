import { Edit } from "@mui/icons-material";
import React from "react";

function ManufacturerCard({ image, title, editAction }) {
  const URL = import.meta.env.VITE_APP_BASE_URL;
  const IMAGE_URL = URL + "/manufacturers/";
  return (
    <div
      style={{
        border: "1px solid #dadada",
        borderRadius: "10px",
        position: "relative",
      }}
    >
      <div>
        <div className="d-flex align-items-center justify-content-between">
          <img
            src={IMAGE_URL + image}
            style={{
              height: "100px",
              width: "100%",
              objectFit: "contain",
              borderRadius: "10px 10px 0 0",
            }}
          />
        </div>
        <div
          style={{ padding: "10px", fontWeight: "600", textAlign: "center" }}
        >
          {title}
        </div>
      </div>
      <div
        style={{ padding: "10px", position: "absolute", top: 0, right: 0 }}
        onClick={editAction}
      >
        <Edit style={{ color: "red", cursor: "pointer" }} />
      </div>
    </div>
  );
}

export default ManufacturerCard;
