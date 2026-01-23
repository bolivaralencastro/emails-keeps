import { useState, useEffect } from 'react';
import { PanelLeftClose, PanelRightClose } from 'lucide-react';
import DesignSystemEditor from './components/DesignSystemEditor';
import TemplateList from './components/TemplateList';
import TemplatePreview from './components/TemplatePreview';
import { defaultDesignSystem } from './utils/tokenInjector';
import './App.css';

const STORAGE_KEY = 'email-design-system';

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [designSystem, setDesignSystem] = useState(defaultDesignSystem);
  const [viewMode, setViewMode] = useState('desktop');
  const [templateVersion, setTemplateVersion] = useState('original'); // 'original' ou 'refatorado'
  const [comparisonMode, setComparisonMode] = useState(false); // modo de comparação lado a lado
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // controle de collapse das sidebars

  // Load design system from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setDesignSystem({ ...defaultDesignSystem, ...parsed });
      } catch (error) {
        console.error('Error loading saved design system:', error);
      }
    }
  }, []);

  // Save design system to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(designSystem));
  }, [designSystem]);

  const handleExport = () => {
    const dataStr = JSON.stringify(designSystem, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `email-design-system-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (config) => {
    setDesignSystem({ ...defaultDesignSystem, ...config });
  };

  const handleReset = () => {
    if (confirm('Tem certeza que deseja resetar todas as configurações para os valores padrão?')) {
      setDesignSystem(defaultDesignSystem);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div className="app">
      <div className={`app-sidebar left ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <DesignSystemEditor
          designSystem={designSystem}
          onChange={setDesignSystem}
          onExport={handleExport}
          onImport={handleImport}
          onReset={handleReset}
        />
      </div>
      
      <div className="app-main">
        {/* Botão de Toggle das Sidebars - só visível no modo de comparação */}
        {comparisonMode && (
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            title={sidebarCollapsed ? 'Expandir painéis' : 'Colapsar painéis'}
          >
            {sidebarCollapsed ? (
              <>
                <PanelRightClose size={20} />
                <PanelLeftClose size={20} />
              </>
            ) : (
              <>
                <PanelLeftClose size={20} />
                <PanelRightClose size={20} />
              </>
            )}
          </button>
        )}
        
        {comparisonMode ? (
          <div className="comparison-view">
            <div className="comparison-panel">
              <div className="comparison-label">Original</div>
              <TemplatePreview
                template={selectedTemplate}
                designSystem={designSystem}
                viewMode={viewMode}
                templateVersion="original"
              />
            </div>
            <div className="comparison-divider"></div>
            <div className="comparison-panel">
              <div className="comparison-label">Refatorado</div>
              <TemplatePreview
                template={selectedTemplate}
                designSystem={designSystem}
                viewMode={viewMode}
                templateVersion="refatorado"
              />
            </div>
          </div>
        ) : (
          <TemplatePreview
            template={selectedTemplate}
            designSystem={designSystem}
            viewMode={viewMode}
            templateVersion={templateVersion}
          />
        )}
      </div>
      
      <div className={`app-sidebar right ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <TemplateList
          selectedTemplate={selectedTemplate}
          onSelectTemplate={setSelectedTemplate}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          templateVersion={templateVersion}
          onTemplateVersionChange={setTemplateVersion}
          comparisonMode={comparisonMode}
          onComparisonModeChange={setComparisonMode}
        />
      </div>
    </div>
  );
}

export default App;
