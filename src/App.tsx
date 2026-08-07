import { Link, Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <div>
            <h1>Página de Login</h1>
            <Link to="/register">Ir a Registro</Link>
          </div>
        }
      />
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
  );
}

export default App;
