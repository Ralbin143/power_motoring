import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import TermsConditions from "./pages/TermsConditions";
import CancelationPolicy from "./pages/CancelationPolicy";
import PrivactPolicy from "./pages/PrivactPolicy";
import ContactUs from "./components/home/ContactUs";
import Pricing from "./components/home/Pricing";
import AboutUs from "./components/home/AboutUs";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/Privacy_Policy" element={<PrivactPolicy />} />
        <Route path="/pricing_policy" element={<Pricing />} />
        <Route path="//about-us" element={<AboutUs />} />
        <Route path="/cancelation-policy" element={<CancelationPolicy />} />
        <Route path="/contact_us" element={<ContactUs />} />
      </Routes>
    </>
  );
}

export default App;
