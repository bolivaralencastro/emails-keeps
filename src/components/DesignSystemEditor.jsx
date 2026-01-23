import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Palette, Image, ChevronDown, ChevronRight, Download, Upload, RotateCcw } from 'lucide-react';
import { templateVariables } from '../utils/templateVariables';
import './DesignSystemEditor.css';

export default function DesignSystemEditor({ designSystem, onChange, onExport, onImport, onReset }) {
  const [expandedSection, setExpandedSection] = useState('branding');
  const [showColorPicker, setShowColorPicker] = useState(null);

  const handleColorChange = (color) => {
    onChange({ ...designSystem, primaryColor: color });
  };

  const handleInputChange = (key, value) => {
    onChange({ ...designSystem, [key]: value });
  };

  const handleVariableChange = (key, value) => {
    onChange({ 
      ...designSystem, 
      variables: { ...designSystem.variables, [key]: value }
    });
  };

  const handleFileImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const config = JSON.parse(event.target.result);
          onImport(config);
        } catch (error) {
          alert('Erro ao importar arquivo JSON');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="design-system-editor">
      <div className="editor-header">
        <h3>Design System</h3>
        <div className="editor-actions">
          <button 
            onClick={onExport} 
            className="icon-btn"
            title="Exportar JSON"
          >
            <Download size={18} />
          </button>
          <label className="icon-btn" title="Importar JSON">
            <Upload size={18} />
            <input type="file" accept=".json" onChange={handleFileImport} style={{ display: 'none' }} />
          </label>
          <button 
            onClick={onReset} 
            className="icon-btn icon-btn-danger"
            title="Resetar"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      <div className="editor-sections">
        {/* Color Section - Apenas Cor Primária */}
        <div className="editor-section">
          <button 
            className="section-header"
            onClick={() => setExpandedSection(expandedSection === 'branding' ? null : 'branding')}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Palette size={18} />
              <span>Branding</span>
            </span>
            <span>
              {expandedSection === 'branding' ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </span>
          </button>
          {expandedSection === 'branding' && (
            <div className="section-content">
              {/* Cor Primária */}
              <div className="form-group">
                <label>Cor Primária</label>
                <div className="color-input-group">
                  <div 
                    className="color-preview"
                    style={{ backgroundColor: designSystem.primaryColor }}
                    onClick={() => setShowColorPicker(!showColorPicker)}
                  />
                  <input
                    type="text"
                    value={designSystem.primaryColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                    placeholder="#6366f1"
                  />
                </div>
                {showColorPicker && (
                  <div className="color-picker-popup">
                    <div 
                      className="color-picker-overlay" 
                      onClick={() => setShowColorPicker(false)}
                    />
                    <HexColorPicker 
                      color={designSystem.primaryColor} 
                      onChange={handleColorChange}
                    />
                  </div>
                )}
                <p className="field-hint">
                  Esta cor será usada em botões, links, ícones e destaques. 
                  10 tonalidades serão geradas automaticamente.
                </p>
              </div>
              
              {/* Logo */}
              <div className="form-group">
                <label>
                  <Image size={16} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }} />
                  URL do Logo
                </label>
                <input
                  type="text"
                  value={designSystem.logoUrl}
                  onChange={(e) => handleInputChange('logoUrl', e.target.value)}
                  placeholder="https://exemplo.com/logo.png"
                />
                {designSystem.logoUrl && (
                  <div className="logo-preview">
                    <img src={designSystem.logoUrl} alt="Logo preview" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Variables Sections */}
        {Object.entries(templateVariables).map(([sectionKey, section]) => (
          <div key={sectionKey} className="editor-section">
            <button 
              className="section-header"
              onClick={() => setExpandedSection(expandedSection === sectionKey ? null : sectionKey)}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {section.lucideIcon && <section.lucideIcon size={18} />}
                <span>{section.label}</span>
              </span>
              <span>
                {expandedSection === sectionKey ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </span>
            </button>
            {expandedSection === sectionKey && (
              <div className="section-content">
                {section.fields.map(field => (
                  <div key={field.key} className="form-group">
                    <label>{field.label}</label>
                    <input
                      type="text"
                      value={designSystem.variables?.[field.key] || field.default}
                      onChange={(e) => handleVariableChange(field.key, e.target.value)}
                      placeholder={field.default}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

