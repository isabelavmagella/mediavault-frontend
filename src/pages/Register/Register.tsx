import { useState, type FormEvent } from "react";
import { SubmitButton } from "../../components/auth/SubmitButton/SubmitButton";
import { TextField } from "../../components/auth/TextField/TextField";
import "./Register.css";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import { ApiError } from "../../lib/api";

export function Register() {
  const { register } = useAuth();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    
    setLoading(true);
    try {
      await register(nome, email, password);
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
    <div className="register-wrapper">
      <img src="/auth/blur-top.svg" className="blur-top" />
      <div className="register-container">
        <div className="container-left">
          <img src="/auth/bubble.svg" className="bubble-left" />
          <div className="logo">
            <img src="/auth/logo.svg" className="logo-icon" />
            <p className="logo-title">MediaVault</p>
          </div>
          <div className="welcome-section">
            <p className="tagline">ARMAZENAMENTO SEGURO</p>
            <h1 className="welcome-title">
              Bem-vindo ao <br /> seu cofre.
            </h1>
          </div>
          <div className="illustration-wrapper">
            <img
              src="/auth/ilustracao-register.svg"
              className="register-illustration-img"
            />
          </div>
          <img src="/auth/small-ring.svg" className="small-ring" />
          <img src="/auth/big-ring.svg" className="big-ring" />
        </div>
        <div className="container-right">
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-header">
              <h2 className="form-title">Criar conta</h2>
              <p className="form-subtitle">Leva menos de um minuto.</p>
            </div>
            <div className="inputs-container">
              <TextField
                imagem="/auth/nome.svg"
                label="Nome"
                type="text"
                name="nome"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
              />
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
              <TextField
                imagem="/auth/senha.svg"
                label="Confirmar senha"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              {error !== null && (
                <p className="register-error" role="alert">
                  {error}
                </p>
              )}
            </div>
            <SubmitButton loading={loading} loadingLabel="Entrando...">
              Criar conta
            </SubmitButton>
          </form>
          <p className="register-text terms">Ao criar a conta você concorda com os Termos de Uso.</p>
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
