import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { ApiError } from "../../lib/api";
import { dashboardService } from "../../services/dashboardService";
import "./Dashboard.css";
import type { DashboardResponse } from "../../types/dashboard.types";
import { Link, useNavigate } from "react-router";

export function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardResponse | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDashboardData() {
      setError(null);
      try {
        const dados = await dashboardService.getStats();
        setStats(dados);
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.status >= 400 && error.status < 500) {
            navigate("/login");
            return;
          }
          setError(error.message);
        } else {
          setError("Erro ao buscar dados.");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, [navigate]);

  const getStatusIcon = (status: "valid" | "expiring" | "expired") => {
    switch (status) {
      case "valid":
        return (
          <img className="badge-status" src="/dashboard/badge-valido.svg" />
        );
      case "expiring":
        return (
          <img className="badge-status" src="/dashboard/badge-expirando.svg" />
        );
      case "expired":
        return (
          <img className="badge-status" src="/dashboard/badge-expirado.svg" />
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <img src="/auth/blur-top.svg" className="blur-top" />
      <div className="dashboard-header">
        <h1 className="dashboard-title">Bem-vindo, {user?.nome}!</h1>
        <p className="dashboard-subtitle">
          Aqui está um resumo dos seus arquivos de mídia.
        </p>
      </div>

      {loading && (
        <div className="spinner-container">
          <div className="spinner" role="status">
            <span className="sr-only">Carregando...</span>
          </div>
        </div>
      )}

      {error && !loading && <p className="mensagem-erro">{error}</p>}

      {!loading && !error && stats !== null && (
        <>
          <div className="cards-grid">
            <div className="card card-total">
              <div className="card-header">
                <p className="card-title">Total de arquivos</p>
                <img
                  className="card-icon"
                  src="/dashboard/total-arquivos.svg"
                />
              </div>
              <p className="card-value">{stats.totalFiles}</p>
              <p className="card-description">Todos os seus arquivos</p>
            </div>

            <div className="card card-valid">
              <div className="card-header">
                <p className="card-title">Arquivos válidos</p>
                <img className="card-icon" src="/dashboard/icon-check.svg" />
              </div>
              <p className="card-value">{stats.validFiles}</p>
              <p className="card-description">Dentro do prazo de 180 dias</p>
            </div>

            <div className="card card-expiring">
              <div className="card-header">
                <p className="card-title">Expirando</p>
                <img className="card-icon" src="/dashboard/icon-relogio.svg" />
              </div>
              <p className="card-value">{stats.expiringFiles}</p>
              <p className="card-description">Expira nos próximos 30 dias</p>
            </div>

            <div className="card card-expired">
              <div className="card-header">
                <p className="card-title">Expirados</p>
                <img className="card-icon" src="/dashboard/icon-alerta.svg" />
              </div>
              <p className="card-value">{stats.expiredFiles}</p>
              <p className="card-description">Fora do prazo de 180 dias</p>
            </div>
          </div>

          {stats.recentFiles.length > 0 ? (
            <div className="table-section">
              <div className="table-section-header">
                <p className="table-section-title">Arquivos recentes</p>
                <a href="#" className="table-section-link">
                  Ver todos
                </a>
              </div>

              <table className="data-table">
                <thead className="table-head">
                  <tr className="table-row-head">
                    <th className="table-th">NOME</th>
                    <th className="table-th">CRIADO EM</th>
                    <th className="table-th">EXPIRA EM</th>
                    <th className="table-th">STATUS</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {stats.recentFiles.map((file) => (
                    <tr key={file.id} className="table-row-body">
                      <td className="table-td td-file-info">
                        <input type="checkbox" name="" id="" />
                        <div className="file-details">
                          <p className="file-name">{file.name}</p>
                          <p className="file-size">
                            {file.type} • {file.size}
                          </p>
                        </div>
                      </td>
                      <td className="table-td td-created-at">
                        {file.uploadDate}
                      </td>
                      <td className="table-td td-expires-at">
                        <p className="expiry-date">
                          {file.expiryDate !== null
                            ? file.expiryDate
                            : "Expirado"}
                        </p>
                        <p className={`expiry-countdown ${file.status}`}>
                          {file.daysRemaining}
                        </p>
                      </td>
                      <td className="table-td td-status">
                        {getStatusIcon(file.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="no-files">Nenhum arquivo recente encontrado</p>
          )}

          <div className="actions-footer">
            <Link className="link" to="/upload">
              <button type="button" className="action-button button-upload">
                <img className="action-icon" src="/dashboard/icon-upload.svg" />
                <div className="action-details">
                  <p className="action-title">Fazer upload</p>
                  <p className="action-description">
                    Envie novos arquivos de áudio, vídeo ou imagem.
                  </p>
                </div>
              </button>
            </Link>

            <Link className="link" to="/meus-arquivos">
              <button type="button" className="action-button button-manage">
                <img
                  className="action-icon"
                  src="/dashboard/gerenciar-arquivos.svg"
                />
                <div className="action-details">
                  <p className="action-title">Gerenciar arquivos</p>
                  <p className="action-description">
                    Vizualize e gerencie todos os seus arquivos.
                  </p>
                </div>
              </button>
            </Link>
          </div>
        </>
      )}
      <img src="/auth/blur-bottom.svg" className="blur-bottom" />
    </div>
  );
}
