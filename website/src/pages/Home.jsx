import React from "react";
import HomeHeader from "../components/home/HomeHeader";
import Banner from "../components/home/banner";
import DownloadApp from "../components/home/DownloadApp";
import AboutUs from "../components/home/AboutUs";
import Footer from "../components/footer/Footer";
import ContactUs from "../components/home/ContactUs";
import Pricing from "../components/home/Pricing";

function Home() {
  const divider = () => {
    return <div style={{ marginBottom: "100px" }}></div>;
  };
  return (
    <div>
      <HomeHeader />
      <Banner />
      {divider()}
      <DownloadApp />
      {divider()}
      <AboutUs />
      {divider()}
      {/* <ContactUs /> */}
      <Pricing />
      {divider()}
      <Footer />
    </div>
  );
}

export default Home;
