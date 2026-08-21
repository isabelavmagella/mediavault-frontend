import { Route, Routes } from "react-router";
import { Login } from "./pages/Login/Login";
import { AuthProvider } from "./context/AuthContext";
import { Register } from "./pages/Register/Register";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
