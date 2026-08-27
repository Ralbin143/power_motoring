import { Logout } from "@mui/icons-material";
import { Modal } from "antd";
import React from "react";
import { useState } from "react";

function TopBar() {
  const [isModelOpen, setIsModelOpen] = useState(false);

  const logout = () => {
    sessionStorage.clear();
    window.location.reload();
  };
  return (
    <div className="p-2 text-end" style={{ cursor: "pointer" }}>
      <Logout onClick={() => setIsModelOpen(true)} />

      <Modal
        title="Logout"
        open={isModelOpen}
        centered
        okText={"Logout"}
        onCancel={() => {
          setIsModelOpen(false);
        }}
        onOk={logout}
      >
        <span>Are you sure, want to logoout?</span>
      </Modal>
    </div>
  );
}

export default TopBar;
