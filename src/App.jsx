import React from "react";
import { Route, Routes } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import VerifyEmail from "./pages/Auth/VerifyEmail/VerifyEmail";
import DashBoard from "./pages/DashBoard/DashBoard";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import JoinWaitlist from "./pages/Home/Waitlist";
import { PlaceHolderLogin } from "./pages/PlaceHolders/FakeLogin";

function App() {
  const [size, setSize] = React.useState(window.innerWidth);

  React.useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
      easing: "ease-out",
      offset: 80,
    });
    const handleResize = () => setSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Routes>
      <Route path="/" index element={<Home />} />
      <Route path="/waitlist" element={<JoinWaitlist />} />
      {/* placeholder routes */}
      <Route path="/login" element={<PlaceHolderLogin />} />
    </Routes>
  );
}

export default App;
