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
      <div className="banner-container-contents" style={{width:"90vw"}}>
        <div style={{ fontSize: "2rem" }}>
          Discover the Roadmap to Automotive Excellence: Your Ultimate Car
          Information Hub!
        </div>
        <div style={{ fontSize: "20px" }}>
          Rev Up Your Knowledge: The Ultimate Destination for Car Enthusiasts
          and Information Seekers!
        </div>

        <div className="btn mt-3" style={{ backgroundColor: "white" }}>
          <a href={"../../assets/beta_1.0.apk"} download={true}>
            <u
              style={{
                textDecoration: "underline !important",
                color: "green !important",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Get it Now!
            </u>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Banner;
