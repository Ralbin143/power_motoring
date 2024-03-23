import React from "react";
import downloadImage from "../../assets/Screenshot_20240130_213648.jpg";
import google from "../../assets/google-play-badge.png";
import apple from "../../assets/app-store-logo.png";

function DownloadApp() {
  const imgPro = {
    width: "200px",
  };
  return (
    <div className="container ">
      <div className="row">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center p-2">
          <img src={downloadImage} alt="" style={imgPro} />
        </div>
        <div className="col-12 col-md-6 d-flex flex-column align-items-center justify-content-center">
          <h4>Our App</h4>
          <p style={{ textAlign: "justify" }}>
            Welcome to our cutting-edge mobile app, the ultimate companion for
            all your vehicle needs! Download our app now and unlock a world of
            possibilities at your fingertips. Whether you're a car enthusiast or
            someone who simply wants to stay informed about your vehicle, our
            app is tailored just for you.
          </p>
          <p style={{ textAlign: "justify" }}>
            Explore a wealth of features, including real-time vehicle
            information, maintenance schedules, and expert tips to keep your
            vehicle in top condition. Our user-friendly interface provides
            seamless access to comprehensive data, ensuring you have the
            knowledge you need to make informed decisions about your vehicle.
            Don't miss out on the convenience and efficiency our app brings to
            managing your vehicle – download it today and experience a new level
            of automotive empowerment!
          </p>
          <p>
            The beta version has been released, and currently, the app is
            available only for Android through this website. Additionally, it is
            not yet available on the Play Store or the App Store, but it will be
            available soon.
          </p>
          <div className="row">
            <div className="col-12 col-md-4 pt-3">
              <a href={"../../assets/beta_1.0.apk"} download={true}>
                <u
                  style={{
                    textDecoration: "underline !important",
                    color: "green !important",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Click here to Download <br /> Beta 1.0 (Android Only)
                </u>
              </a>
            </div>
            <div className="col-12 col-md-4  pt-3">
              <strong>Coming Soon</strong>
              <br />
              <img
                src={google}
                alt=""
                style={{
                  filter: "grayscale(1)",
                  opacity: ".5",
                  height: "60px",
                }}
              />
            </div>
            <div className="col-12 col-md-4 pt-3">
              <strong>Coming Soon</strong>
              <br />
              <img
                src={apple}
                alt=""
                style={{
                  filter: "grayscale(1)",
                  opacity: ".5",
                  height: "60px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DownloadApp;
