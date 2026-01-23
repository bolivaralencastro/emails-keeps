/**
 * Email Template Renderer - JSON-driven JSX
 * 
 * Renderiza templates de email como componentes React
 */

export function EmailTemplate({ emailData, designSystem }) {
  const { primaryColor, logoUrl } = designSystem;

  return (
    <div className="email-wrapper">
      <div className="email-container">
        <EmailHeader header={emailData.header} logoUrl={logoUrl} />
        <EmailContent content={emailData.content} primaryColor={primaryColor} />
        <EmailFooter primaryColor={primaryColor} />
      </div>
      
      {/* Keeps Branding Footer */}
      <div className="keeps-branding">
        <p className="keeps-text">Desenvolvido por Keeps</p>
        <p className="keeps-location">Florianópolis | SC | Brasil</p>
      </div>
    </div>
  );
}

function EmailHeader({ header, logoUrl }) {
  return (
    <div className="email-header">
      {logoUrl && <img src={logoUrl} className="email-logo" alt="Logo" />}
      {header.icon && (
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

function EmailFooter({ primaryColor }) {
  return (
    <div className="email-footer">
      <p className="footer-company">{'{{companyName}}'}</p>
      <p className="footer-address">{'{{companyAddress}}'}</p>
      <div style={{ marginTop: '16px' }}>
        <a href="{{whatsappUrl}}" className="footer-social">
          <span className="material-symbols-outlined" style={{ fontSize: '18px', verticalAlign: 'middle', marginRight: '4px' }}>
            chat
          </span>
          WhatsApp
        </a>
        <a href="mailto:{{supportEmail}}" className="footer-social" style={{ marginLeft: '16px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px', verticalAlign: 'middle', marginRight: '4px' }}>
            mail
          </span>
          Email
        </a>
      </div>
    </div>
  );
}
