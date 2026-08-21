import { Link, Route, Routes } from "react-router";
import { Login } from "./pages/Login/Login";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/register"
          element={
            <div>
              <h1>Página de Registro</h1>
              <Link to="/login">Ir a Login</Link>
            </div>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
