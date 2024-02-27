import React from "react";
import "./header.css";
import logoImage from "../../assets/logo.25acdb35f6bb32434d95.png";
import { ScrollLink } from "react-scroll";

function HomeHeader() {
  const logo = {
    height: "60px",
  };

  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-between">
        <a href="/">
          <img src={logoImage} style={logo} />
        </a>
        <div>
          <ul className="nav-menu">
            <li>
              <a href="/Privacy_Policy">Privacy Policy</a>
            </li>
            <div className="vertical-seperator">&nbsp;</div>
            <li>
              <a href="/pricing_policy">Pricing Policy</a>
            </li>
            <div className="vertical-seperator">&nbsp;</div>
            <li>
              <a href="/terms-conditions">Terms & Conditions</a>
            </li>
            <div className="vertical-seperator">&nbsp;</div>
            <li>
              <a href="/cancelation-policy">Cancelation Policy</a>
            </li>
            <div className="vertical-seperator">&nbsp;</div>
            <li>
              <a href="/about-us">About Us</a>
            </li>
            <div className="vertical-seperator">&nbsp;</div>
            <li>
              <a href="/contact_us">Contact us</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomeHeader;
