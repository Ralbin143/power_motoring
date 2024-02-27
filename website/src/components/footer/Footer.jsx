import React from "react";
import Logo from "../../assets/logo.25acdb35f6bb32434d95.png";

function Footer() {
  const footer = {
    background: "black",
  };
  return (
    <div style={footer} className="p-5">
      <div className="container d-flex justify-content-between flex-wrap">
        <img src={Logo} alt="" width={200} />
        {/* Footer */}
        {/* <div style={{ color: "white" }}>
          <div className="d-flex flex-column">
            <strong>Contact Us</strong>
            <strong>Nisamudheen Ali</strong>
            <span>Padinjarechalil,</span>
            <span>Market P.O,</span>
            <span>Muvattupuzha,</span>
            <span>admin@powermotoring.com</span>
            <span>+91 8075 44 1550</span>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Footer;
