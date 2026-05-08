import { useTheme } from '../../context/ThemeContext';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <span className="header-icon">🛰️</span>
          <h1 className="header-title">ISS & News Dashboard</h1>
        </div>
        <nav className="header-nav">
          <a href="#iss" className="nav-link">ISS Tracker</a>
          <a href="#news" className="nav-link">News</a>
          <a href="#charts" className="nav-link">Charts</a>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </nav>
      </div>
    </header>
  );
}
