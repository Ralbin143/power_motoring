import React from "react";
import chevi from "../../assets/Chevrolet camaro.avif";

function Banner() {
  const bannerImage = {
    height: "calc(100vh - 60px)",
    width: "100%",
    objectFit: "cover",
  };
  return (
    <div className="banner-container">
      <img src={chevi} alt="" style={bannerImage} />
      <div className="banner-container-contents">
        <div style={{ fontSize: "40px" }}>
          Discover the Roadmap to Automotive Excellence: Your Ultimate Car
          Information Hub!
        </div>
        <div style={{ fontSize: "20px" }}>
          Rev Up Your Knowledge: The Ultimate Destination for Car Enthusiasts
          and Information Seekers!
        </div>
      </div>
    </div>
  );
}

export default Banner;
