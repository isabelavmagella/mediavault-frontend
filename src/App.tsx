import { Route, Routes } from "react-router";
import { Login } from "./pages/Login/Login";
import { AuthProvider } from "./context/AuthContext";
import { Register } from "./pages/Register/Register";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { Appshell } from "./components/Sidebar/Appshell";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Appshell />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
