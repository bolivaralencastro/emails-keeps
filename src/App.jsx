import { useState, useEffect } from 'react';
import { Monitor, Smartphone, Split, Maximize, Minimize } from 'lucide-react';
import AppHeader from './components/AppHeader';
import DesignSystemEditor from './components/DesignSystemEditor';
import TemplateList from './components/TemplateList';
import TemplatePreview from './components/TemplatePreview';
import VariablesInfoDialog from './components/VariablesInfoDialog';
import { defaultDesignSystem } from './utils/tokenInjector';
import { templateList } from './utils/templateList';
import './App.css';

const STORAGE_KEY = 'email-design-system';

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [designSystem, setDesignSystem] = useState(defaultDesignSystem);
  const [viewMode, setViewMode] = useState('desktop');
  const [templateVersion, setTemplateVersion] = useState('original'); // 'original' ou 'refatorado'
  const [comparisonMode, setComparisonMode] = useState(false); // modo de comparação lado a lado
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // controle de collapse das sidebars
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [fullscreenMode, setFullscreenMode] = useState(false);

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
    
    // Set first template as default
    if (templateList.length > 0) {
      setSelectedTemplate(templateList[0]);
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        if (!selectedTemplate) return;
        
        const currentIndex = templateList.indexOf(selectedTemplate);
        if (currentIndex === -1) return;

        if (e.key === 'ArrowLeft' && currentIndex > 0) {
          setSelectedTemplate(templateList[currentIndex - 1]);
        } else if (e.key === 'ArrowRight' && currentIndex < templateList.length - 1) {
          setSelectedTemplate(templateList[currentIndex + 1]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedTemplate]);

  return (
    <div className={`app ${fullscreenMode ? 'fullscreen' : ''}`}>
      <VariablesInfoDialog 
        isOpen={infoDialogOpen} 
        onClose={() => setInfoDialogOpen(false)} 
      />
      
      <div className={`app-sidebar left ${sidebarCollapsed || fullscreenMode ? 'collapsed' : ''}`}>
        <DesignSystemEditor
          designSystem={designSystem}
          onChange={setDesignSystem}
          onExport={handleExport}
          onImport={handleImport}
          onReset={handleReset}
        />
      </div>
      
      <div className="app-main">
        {comparisonMode ? (
          <div className="comparison-view">
            <div className="comparison-panel">
              <div className="comparison-label">Original</div>
              <TemplatePreview
                template={selectedTemplate}
                designSystem={designSystem}
                viewMode={viewMode}
                templateVersion="original"
                isFullscreen={fullscreenMode}
                hideToolbar={true}
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
                isFullscreen={fullscreenMode}
                hideToolbar={true}
              />
            </div>
            <div className="preview-toolbar-bottom">
              <button 
                className={`toolbar-btn ${viewMode === 'desktop' ? 'active' : ''}`}
                onClick={() => setViewMode('desktop')}
                title="Visualização Desktop"
              >
                <Monitor size={18} />
              </button>
              <button 
                className={`toolbar-btn ${viewMode === 'mobile' ? 'active' : ''}`}
                onClick={() => setViewMode('mobile')}
                title="Visualização Mobile"
              >
                <Smartphone size={18} />
              </button>
              <div className="toolbar-divider"></div>
              <button 
                className="toolbar-btn active"
                onClick={() => setComparisonMode(false)}
                title="Modo Normal"
              >
                <Split size={18} />
              </button>
              <div className="toolbar-divider"></div>
              <button 
                className="toolbar-btn"
                onClick={() => setFullscreenMode(!fullscreenMode)}
                title={fullscreenMode ? 'Sair da tela cheia' : 'Tela cheia'}
              >
                {fullscreenMode ? <Minimize size={18} /> : <Maximize size={18} />}
              </button>
            </div>
          </div>
        ) : (
          <TemplatePreview
            template={selectedTemplate}
            designSystem={designSystem}
            viewMode={viewMode}
            templateVersion={templateVersion}
            onToggleFullscreen={() => setFullscreenMode(!fullscreenMode)}
            isFullscreen={fullscreenMode}
            onViewModeChange={setViewMode}
            onTemplateVersionChange={setTemplateVersion}
            comparisonMode={comparisonMode}
            onComparisonModeChange={setComparisonMode}
          />
        )}
      </div>
      
      <div className={`app-sidebar right ${sidebarCollapsed || fullscreenMode ? 'collapsed' : ''}`}>
        <TemplateList
          selectedTemplate={selectedTemplate}
          onSelectTemplate={setSelectedTemplate}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          templateVersion={templateVersion}
          onTemplateVersionChange={setTemplateVersion}
          comparisonMode={comparisonMode}
          onComparisonModeChange={setComparisonMode}
          onInfoClick={() => setInfoDialogOpen(true)}
        />
      </div>
    </div>
  );
}

export default App;
