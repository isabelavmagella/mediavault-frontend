import { useState, type FormEvent } from "react";
import { SubmitButton } from "../../components/auth/SubmitButton/SubmitButton";
import { TextField } from "../../components/auth/TextField/TextField";
import "./Login.css";
import { useNavigate } from "react-router";
import { ApiError } from "../../lib/api";
import { useAuth } from "../../hooks/useAuth";

export function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      if (error instanceof ApiError) {
        setError(error.message);
      } else {
        setError("Não foi possível entrar. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-wrapper">
      <img src="/auth/blur-top.svg" className="blur-top" />
      <div className="login-container">
        <div className="container-left">
          <img src="/auth/bubble.svg" className="bubble-left" />
          <div className="logo">
            <img src="/auth/logo.svg" className="logo-icon" />
            <p className="logo-title">MediaVault</p>
          </div>
          <div className="welcome-section">
            <p className="tagline">ARMAZENAMENTO SEGURO</p>
            <h1 className="welcome-title">
              Bem-vindo <br /> de volta!
            </h1>
          </div>
          <div className="illustration-wrapper">
            <img
              src="/auth/ilustracao-login.svg"
              className="login-illustration-img"
            />
          </div>
          <img src="/auth/small-ring.svg" className="small-ring" />
          <img src="/auth/big-ring.svg" className="big-ring" />
        </div>
        <div className="container-right">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-header">
              <h2 className="form-title">Entrar</h2>
              <p className="form-subtitle">Que bom te ver de novo!</p>
            </div>
            <div className="inputs-container">
              <TextField
                imagem="/auth/email.svg"
                label="E-mail"
                type="text"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextField
                imagem="/auth/senha.svg"
                label="Senha"
                type="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              {error !== null && (
                <p className="login-error" role="alert">
                  {error}
                </p>
              )}
            </div>
            <SubmitButton loading={loading} loadingLabel="Entrando...">
              Entrar
            </SubmitButton>
          </form>
          <p className="register-text">
            Não tem uma conta?{" "}
            <a href="/register" className="register-link">
              Cadastre-se
            </a>
          </p>
        </div>
      </div>
      <img src="/auth/blur-bottom.svg" className="blur-bottom" />
    </div>
  );
}
