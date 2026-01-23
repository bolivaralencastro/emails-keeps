import { templateList, templateCategories, getTemplateName } from '../utils/templateList';
import { 
  Monitor, Smartphone, File, Sparkles, GitCompare, Eye, Mail, Info, 
  ChevronDown, ChevronRight, BarChart3, UserPlus, Clock, Calendar, 
  Settings, Target, MessageCircle, User 
} from 'lucide-react';
import { useState } from 'react';
import './TemplateList.css';

const iconMap = {
  BarChart3,
  UserPlus,
  Clock,
  Calendar,
  Settings,
  Target,
  MessageCircle,
  User
};

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
  const [expandedCategories, setExpandedCategories] = useState(
    templateCategories.reduce((acc, cat) => ({ ...acc, [cat.id]: true }), {})
  );

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };
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
      
      <div className="template-clusters">
        {templateCategories.map((category) => {
          const IconComponent = iconMap[category.icon];
          return (
            <div key={category.id} className="template-cluster">
              <button 
                className="cluster-header"
                onClick={() => toggleCategory(category.id)}
              >
                <span className="cluster-chevron">
                  {expandedCategories[category.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </span>
                <span className="cluster-icon-main">
                  {IconComponent && <IconComponent size={16} />}
                </span>
                <span className="cluster-name">{category.name}</span>
                <span className="cluster-count">{category.templates.length}</span>
              </button>
              
              {expandedCategories[category.id] && (
                <div className="template-grid">
                  {category.templates.map((template) => (
                    <div
                      key={template}
                      className={`template-item ${selectedTemplate === template ? 'active' : ''}`}
                      onClick={() => onSelectTemplate(template)}
                    >
                      <div className="template-icon">
                        <Mail size={20} />
                      </div>
                      <div className="template-name">{getTemplateName(template)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
