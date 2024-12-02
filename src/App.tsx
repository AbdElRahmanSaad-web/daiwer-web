import "./App.css";
import { Login } from "./pages/Auth/login";
import Register from "./pages/Auth/Register";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
