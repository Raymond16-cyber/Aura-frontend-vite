import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  const [size, setSize] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size < 640 ? (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
    </Routes>
  ) : (
    <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-600">
      Aura is best experienced on mobile 🌿
    </div>
  );
}

export default App;
