/**
 * Email Template Renderer - JSON-driven JSX
 * 
 * Renderiza templates de email como componentes React
 */
import { keepsSupportContacts } from '../utils/supportContacts';

export function EmailTemplate({ emailData, designSystem }) {
  const { primaryColor, logoUrl, headerIconsEnabled, supportContactsMode, useCustomSupportContacts, variables } = designSystem;
  const useCustomSupport = useCustomSupportContacts ?? supportContactsMode === 'custom';
  const supportEmail = useCustomSupport ? variables?.supportEmail : keepsSupportContacts.supportEmail;
  const whatsappUrl = useCustomSupport ? variables?.whatsappUrl : keepsSupportContacts.whatsappUrl;

  return (
    <div className="email-wrapper">
      <div className="email-container">
        <EmailHeader header={emailData.header} logoUrl={logoUrl} headerIconsEnabled={headerIconsEnabled} />
        <EmailContent content={emailData.content} primaryColor={primaryColor} />
      </div>
      
      {/* Help Section */}
      <div style={{ marginTop: '32px', padding: '24px 16px', textAlign: 'center' }}>
        <p style={{ fontWeight: 700, fontSize: '12px', color: '#4b5563', margin: '0 0 12px 0' }}>
          Precisa de Ajuda?
        </p>
        <div style={{ marginBottom: '24px' }}>
          <a href={whatsappUrl} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', margin: '0 12px', textDecoration: 'none', color: '#6b7280', fontSize: '12px', fontWeight: 500 }}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
              chat
            </span>
            WhatsApp
          </a>
          <a href={`mailto:${supportEmail}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', margin: '0 12px', textDecoration: 'none', color: '#6b7280', fontSize: '12px', fontWeight: 500 }}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
              mail
            </span>
            Email
          </a>
        </div>
      </div>
    </div>
  );
}

function EmailHeader({ header, logoUrl, headerIconsEnabled }) {
  return (
    <div className="email-header">
      {logoUrl && <img src={logoUrl} className="email-logo" alt="Logo" />}
      {header.icon && headerIconsEnabled && (
        <div className="email-icon">
          <span className="material-symbols-outlined" style={{ fontSize: `${header.iconSize || 48}px` }}>
            {header.icon}
          </span>
        </div>
      )}
      <h1 className="email-title">{header.title}</h1>
      {header.subtitle && <p className="email-subtitle">{header.subtitle}</p>}
    </div>
  );
}

function EmailContent({ content, primaryColor }) {
  return (
    <div className="email-content">
      {content.intro && <p className="content-intro">{content.intro}</p>}
      
      {content.sections && content.sections.map((section, index) => (
        <ContentSection key={index} section={section} />
      ))}
      
      {content.cta && (
        <div className="cta-wrapper">
          <a 
            href={content.cta.url} 
            className="btn-primary"
            style={{ backgroundColor: primaryColor }}
          >
            {content.cta.icon && (
              <span className="material-symbols-outlined" style={{ fontSize: '18px', verticalAlign: 'middle', marginRight: '8px' }}>
                {content.cta.icon}
              </span>
            )}
            {content.cta.text}
          </a>
        </div>
      )}
      
      {content.footer && (
        <div className="content-footer">
          {content.footer.text && <p className="footer-text">{content.footer.text}</p>}
          {content.footer.hint && <p className="footer-hint">{content.footer.hint}</p>}
        </div>
      )}
    </div>
  );
}

function ContentSection({ section }) {
  if (!section.type) return null;

  return (
    <div className="content-section">
      {section.title && <h2 className="section-title">{section.title}</h2>}
      
      {section.type === 'info-card' && <InfoCard items={section.items} />}
      {section.type === 'list' && <ContentList items={section.items} />}
      {section.type === 'alert' && <Alert section={section} />}
      {section.type === 'text' && <p>{section.content}</p>}
    </div>
  );
}

function InfoCard({ items }) {
  return (
    <div className="info-card">
      {items.map((item, index) => (
        <div key={index} className="info-item">
          {item.icon && (
            <div className="info-item-icon">
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                {item.icon}
              </span>
            </div>
          )}
          <div className="info-item-content">
            <p className="info-item-label">{item.label}</p>
            <p className="info-item-value">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ContentList({ items }) {
  return (
    <ul className="content-list">
      {items.map((item, index) => (
        <li key={index} className="content-list-item">
          {item.icon && (
            <span className="material-symbols-outlined" style={{ fontSize: '20px', marginRight: '12px' }}>
              {item.icon}
            </span>
          )}
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

function Alert({ section }) {
  const alertClass = section.variant ? `alert-${section.variant}` : 'alert-info';
  
  return (
    <div className={`alert ${alertClass}`}>
      {section.icon && (
        <span className="material-symbols-outlined" style={{ fontSize: '20px', marginRight: '12px', verticalAlign: 'middle' }}>
          {section.icon}
        </span>
      )}
      {section.content}
    </div>
  );
}
