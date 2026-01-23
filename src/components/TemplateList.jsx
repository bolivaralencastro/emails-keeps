import { templateList, getTemplateName } from '../utils/templateList';
import { Monitor, Smartphone, File, Sparkles, GitCompare, Eye, Mail, Info } from 'lucide-react';
import './TemplateList.css';

export default function TemplateList({ 
  selectedTemplate, 
  onSelectTemplate, 
  viewMode, 
  onViewModeChange,
  templateVersion,
  onTemplateVersionChange,
  comparisonMode,
  onComparisonModeChange,
  onInfoClick
}) {
  return (
    <div className="template-list">
      <div className="template-header">
        <h3>Templates ({templateList.length})</h3>
        <div className="header-actions">
          <button 
            className="info-icon-btn"
            onClick={onInfoClick}
            title="Ver propriedades dinâmicas"
          >
            <Info size={18} />
          </button>
          <div className="view-mode-toggle">
            <button
              className={viewMode === 'desktop' ? 'active' : ''}
              onClick={() => onViewModeChange('desktop')}
              title="Desktop"
            >
              <Monitor size={18} />
            </button>
            <button
              className={viewMode === 'mobile' ? 'active' : ''}
              onClick={() => onViewModeChange('mobile')}
              title="Mobile"
            >
              <Smartphone size={18} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Toggle de Versão do Template */}
      <div className="template-version-control">
        <div className="version-toggle-group">
          <button
            className={`version-btn ${templateVersion === 'original' && !comparisonMode ? 'active' : ''}`}
            onClick={() => {
              onTemplateVersionChange('original');
              onComparisonModeChange(false);
            }}
            disabled={comparisonMode}
          >
            <File size={16} />
            <span>Original</span>
          </button>
          <button
            className={`version-btn ${templateVersion === 'refatorado' && !comparisonMode ? 'active' : ''}`}
            onClick={() => {
              onTemplateVersionChange('refatorado');
              onComparisonModeChange(false);
            }}
            disabled={comparisonMode}
          >
            <Sparkles size={16} />
            <span>Refatorado</span>
          </button>
        </div>
        
        <button
          className={`comparison-btn ${comparisonMode ? 'active' : ''}`}
          onClick={() => onComparisonModeChange(!comparisonMode)}
          title="Comparar lado a lado"
        >
          {comparisonMode ? (
            <>
              <GitCompare size={18} />
              <span>Comparação Ativa</span>
            </>
          ) : (
            <>
              <Eye size={18} />
              <span>Comparar</span>
            </>
          )}
        </button>
      </div>
      
      <div className="template-grid">
        {templateList.map((template) => (
          <div
            key={template}
            className={`template-item ${selectedTemplate === template ? 'active' : ''}`}
            onClick={() => onSelectTemplate(template)}
          >
            <div className="template-icon">
              <Mail size={24} />
            </div>
            <div className="template-name">{getTemplateName(template)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
