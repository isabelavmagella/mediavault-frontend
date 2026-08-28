import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import '../../index.css';
import './AppShell.css';
import { CloseIcon, MenuIcon } from './icons';
import { NAV_ITEMS } from './nav-items';

function handleNewUploadClick() {
  // TODO: abrir fluxo de upload
}

export function Appshell() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  function renderNavLinks(onNavigate: () => void) {
    return NAV_ITEMS.map(({ id, label, path, end, icon: Icon }) => (
      <NavLink
        key={id}
        to={path}
        end={end}
        onClick={onNavigate}
        className={({ isActive }) =>
          isActive ? 'shell-nav-item shell-nav-item--active' : 'shell-nav-item'
        }
      >
        <Icon className="shell-nav-item__icon" />
        <span>{label}</span>
      </NavLink>
    ));
  }

  return (
    <div className="app-shell">
      <img className="app-shell__ambient app-shell__ambient--tl" src="/shell/ambient.svg" alt="" aria-hidden="true" />
      <img className="app-shell__ambient app-shell__ambient--br" src="/shell/ambient.svg" alt="" aria-hidden="true" />

      <aside className="app-shell__sidebar">
        <Link className="shell-logo" to="/">
          <img className="shell-logo__mark" src="/auth/logo.svg" alt="" aria-hidden="true" />
          <span className="shell-logo__text">MediaVault</span>
        </Link>

        <button type="button" className="shell-upload-button" onClick={handleNewUploadClick}>
          <img className="shell-upload-button__icon" src="/sidebar/icon-upload.svg" alt="" aria-hidden="true" />
          Novo Upload
        </button>

        <nav className="shell-nav">{renderNavLinks(() => {})}</nav>
      </aside>

      <header className="app-shell__topbar">
        <button
          type="button"
          className={menuOpen ? 'shell-menu-toggle shell-menu-toggle--open' : 'shell-menu-toggle'}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        {menuOpen && (
          <>
            <div className="shell-menu-overlay" onClick={closeMenu} aria-hidden="true" />
            <div className="shell-menu-panel">
              <button
                type="button"
                className="shell-upload-button"
                onClick={() => {
                  closeMenu();
                  handleNewUploadClick();
                }}
              >
                <img className="shell-upload-button__icon" src="/shell/icon-upload.svg" alt="" aria-hidden="true" />
                Novo Upload
              </button>

              <nav className="shell-nav">{renderNavLinks(closeMenu)}</nav>
            </div>
          </>
        )}
      </header>

      <main className="app-shell__content">
        <Outlet />
      </main>
    </div>
  );
}
