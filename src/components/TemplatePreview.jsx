import { useState, useEffect } from 'react';
import { AlertCircle, MousePointer, Maximize, Minimize, Monitor, Smartphone } from 'lucide-react';
import { EmailTemplate } from './EmailTemplate';
import { applyDesignTokens } from '../utils/tokenInjector';
import './TemplatePreview.css';
import './EmailTemplate.css';

export default function TemplatePreview({ template, designSystem, viewMode, templateVersion = 'original', onToggleFullscreen, isFullscreen, onViewModeChange }) {
  const [emailData, setEmailData] = useState(null);
  const [rawHtml, setRawHtml] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (template) {
      loadEmailContent();
    } else {
      setEmailData(null);
      setRawHtml(null);
      setError(null);
    }
  }, [template, templateVersion]);

  const loadEmailContent = async () => {
    setLoading(true);
    setError(null);
    setEmailData(null);
    setRawHtml(null);
    
    try {
      console.log('Loading email:', template, 'version:', templateVersion);
      
      if (templateVersion === 'refatorado') {
        // Carregar JSON do email refatorado - renderiza como React component
        const cacheBuster = `?t=${Date.now()}`;
        const baseUrl = import.meta.env.BASE_URL || '/';
        const response = await fetch(`${baseUrl}email-data/${template}.json${cacheBuster}`);
        
        if (!response.ok) {
          throw new Error(`Email data não encontrado: ${template}.json`);
        }
        
        const data = await response.json();
        console.log('Email JSON loaded:', data.name);
        setEmailData(data);
      } else {
        // Template original - carregar HTML direto e usar iframe (legado)
        const cacheBuster = `?t=${Date.now()}`;
        const baseUrl = import.meta.env.BASE_URL || '/';
        const response = await fetch(`${baseUrl}templates/${template}.html${cacheBuster}`);
        
        if (!response.ok) {
          throw new Error(`Template não encontrado: ${template}.html`);
        }
        
        const html = await response.text();
        console.log('Original HTML loaded, length:', html.length);
        
        // Aplicar design tokens no HTML original
        const processed = applyDesignTokens(html, designSystem);
        setRawHtml(processed);
      }
    } catch (error) {
      console.error('Error loading email:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`template-preview ${isFullscreen ? 'fullscreen-mode' : ''}`}>
      <div className="preview-toolbar">
        {onViewModeChange && (
          <div className="view-mode-buttons">
            <button 
              className={`view-mode-btn ${viewMode === 'desktop' ? 'active' : ''}`}
              onClick={() => onViewModeChange('desktop')}
              title="Visualização Desktop"
            >
              <Monitor size={18} />
            </button>
            <button 
              className={`view-mode-btn ${viewMode === 'mobile' ? 'active' : ''}`}
              onClick={() => onViewModeChange('mobile')}
              title="Visualização Mobile"
            >
              <Smartphone size={18} />
            </button>
          </div>
        )}
        {onToggleFullscreen && (
          <button 
            className="fullscreen-btn"
            onClick={onToggleFullscreen}
            title={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
          >
            {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>
        )}
      </div>
      <div className="preview-content">
        {loading ? (
          <div className="preview-loading">Carregando...</div>
        ) : error ? (
          <div className="preview-error">
            <AlertCircle size={48} color="#dc3545" />
            <p>Erro ao carregar template</p>
            <p style={{ fontSize: '14px', color: '#666' }}>{error}</p>
          </div>
        ) : emailData ? (
          // Template refatorado - renderiza como React component (SEM IFRAME!)
          <div className={`preview-frame-react ${viewMode}`}>
            <EmailTemplate emailData={emailData} designSystem={designSystem} />
          </div>
        ) : rawHtml ? (
          // Template original - usa iframe (legado)
          <div className={`preview-frame ${viewMode}`}>
            <iframe
              key={`${template}-${templateVersion}-${Date.now()}`}
              srcDoc={rawHtml}
              title="Email Preview"
            />
          </div>
        ) : (
          <div className="preview-empty">
            <MousePointer size={48} color="#9ca3af" />
            <p>Selecione um template na lista para visualizar</p>
          </div>
        )}
      </div>
    </div>
  );
}
