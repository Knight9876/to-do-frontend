import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Landing from "./pages/Landing/Landing";

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    // Optional: sync across tabs
    const handleStorage = () => {
      setIsAuth(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={() => setIsAuth(true)} />} />
        <Route
          path="/home"
          element={isAuth ? <Home /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
