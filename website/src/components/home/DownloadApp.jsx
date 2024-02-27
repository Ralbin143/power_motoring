import React from "react";
import downloadImage from "../../assets/Screenshot_20240130_213648.jpg";
import google from "../../assets/google-play-badge.png";

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
          <img src={google} alt="" />
        </div>
      </div>
    </div>
  );
}

export default DownloadApp;
