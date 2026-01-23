import { Info } from 'lucide-react';
import './AppHeader.css';

export default function AppHeader({ viewMode, onViewModeChange, onInfoClick }) {
  return (
    <header className="app-header">
      <div className="app-header-left">
        <div className="app-logo">
          <div className="logo-icon">📧</div>
          <div className="logo-text">
            <span className="logo-title">Email Designer</span>
            <span className="logo-subtitle">Template Editor</span>
          </div>
        </div>
      </div>
      
      <div className="app-header-center">
        <div className="view-mode-toggle">
          <button
            className={viewMode === 'desktop' ? 'active' : ''}
            onClick={() => onViewModeChange('desktop')}
          >
            <span>🖥️</span>
            <span className="btn-label">Desktop</span>
          </button>
          <button
            className={viewMode === 'mobile' ? 'active' : ''}
            onClick={() => onViewModeChange('mobile')}
          >
            <span>📱</span>
            <span className="btn-label">Mobile</span>
          </button>
        </div>
      </div>
      
      <div className="app-header-right">
        <button 
          className="info-button"
          onClick={onInfoClick}
          title="Ver propriedades dinâmicas"
        >
          <Info size={20} />
        </button>
        <div className="template-count-badge">
          <span className="badge-number">27</span>
          <span className="badge-label">Templates</span>
        </div>
      </div>
    </header>
  );
}
