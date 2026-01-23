/**
 * Email Template Renderer - JSON-driven
 * 
 * Renderiza templates de email a partir de:
 * 1. Dados JSON (conteúdo específico do email)
 * 2. Design System (cores, logo, etc)
 * 3. Template base padronizado
 */

export function renderEmailTemplate(emailData, designSystem) {
  const { primaryColor, logoUrl } = designSystem;
  
  // Gerar HTML do header
  const headerHTML = renderHeader(emailData.header, logoUrl);
  
  // Gerar HTML do conteúdo
  const contentHTML = renderContent(emailData.content);
  
  // Montar template completo
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${emailData.name}</title>
  
  <style type="text/css">
    /* Reset */
    body, table, td, a { 
      -webkit-text-size-adjust: 100%; 
      -ms-text-size-adjust: 100%; 
    }
    table, td { 
      mso-table-lspace: 0pt; 
      mso-table-rspace: 0pt; 
    }
    img { 
      -ms-interpolation-mode: bicubic; 
      border: 0; 
      height: auto; 
      line-height: 100%; 
      outline: none; 
      text-decoration: none; 
    }
    
    /* Base */
    body {
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      height: 100% !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      background-color: #f3f5f8;
    }
    
    /* Container Principal */
    .email-wrapper {
      width: 100%;
      background-color: #f3f5f8;
      padding: 40px 0;
    }
    
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
    
    /* Header */
    .email-header {
      text-align: center;
      padding: 40px 32px;
      background-color: #ffffff;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .email-logo {
      max-width: 150px;
      height: auto;
      margin-bottom: 24px;
    }
    
    .email-icon {
      display: inline-block;
      margin-bottom: 16px;
    }
    
    .email-title {
      margin: 0;
      font-size: 26px;
      font-weight: 700;
      line-height: 1.3;
      color: #111827;
    }
    
    .email-subtitle {
      margin: 8px 0 0 0;
      font-size: 16px;
      color: #6b7280;
    }
    
    /* Content */
    .email-content {
      padding: 32px;
    }
    
    .content-intro {
      font-size: 16px;
      line-height: 1.6;
      color: #374151;
      margin: 0 0 24px 0;
    }
    
    /* Sections */
    .content-section {
      margin-bottom: 24px;
    }
    
    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: #111827;
      margin: 0 0 16px 0;
    }
    
    /* Info Card */
    .info-card {
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 16px;
    }
    
    .info-item {
      display: flex;
      align-items: start;
      margin-bottom: 12px;
    }
    
    .info-item:last-child {
      margin-bottom: 0;
    }
    
    .info-item-icon {
      margin-right: 12px;
      flex-shrink: 0;
    }
    
    .info-item-content {
      flex: 1;
    }
    
    .info-item-label {
      font-size: 14px;
      color: #6b7280;
      margin: 0 0 4px 0;
    }
    
    .info-item-value {
      font-size: 16px;
      font-weight: 600;
      color: #111827;
      margin: 0;
    }
    
    /* Alert */
    .alert {
      padding: 16px;
      border-radius: 8px;
      border-left: 4px solid;
      margin-bottom: 16px;
    }
    
    .alert-warning {
      background-color: #fef3c7;
      border-color: #f59e0b;
    }
    
    .alert-info {
      background-color: #dbeafe;
      border-color: ${primaryColor};
    }
    
    .alert-success {
      background-color: #d1fae5;
      border-color: #10b981;
    }
    
    .alert-error {
      background-color: #fee2e2;
      border-color: #ef4444;
    }
    
    /* List */
    .content-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .content-list-item {
      padding: 12px 0;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      align-items: center;
    }
    
    .content-list-item:last-child {
      border-bottom: none;
    }
    
    /* CTA Button */
    .cta-wrapper {
      text-align: center;
      margin: 32px 0;
    }
    
    .btn-primary {
      display: inline-block;
      background-color: ${primaryColor};
      color: #ffffff !important;
      text-decoration: none;
      padding: 16px 32px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      transition: background-color 0.2s;
    }
    
    .btn-primary:hover {
      opacity: 0.9;
    }
    
    /* Footer Content */
    .content-footer {
      text-align: center;
      padding-top: 24px;
      border-top: 1px solid #e5e7eb;
    }
    
    .footer-text {
      font-size: 14px;
      color: #6b7280;
      margin: 0 0 8px 0;
    }
    
    .footer-hint {
      font-size: 12px;
      color: #9ca3af;
      margin: 0;
    }
    
    /* Email Footer */
    .email-footer {
      padding: 24px 32px;
      text-align: center;
      background-color: #f9fafb;
      border-top: 1px solid #e5e7eb;
    }
    
    .footer-company {
      font-size: 14px;
      font-weight: 600;
      color: #111827;
      margin: 0 0 4px 0;
    }
    
    .footer-address {
      font-size: 12px;
      color: #6b7280;
      margin: 0 0 16px 0;
    }
    
    .footer-social {
      display: inline-block;
      margin: 0 8px;
      color: #6b7280;
      text-decoration: none;
      font-size: 14px;
    }
    
    /* Mobile Responsive */
    @media only screen and (max-width: 600px) {
      .email-wrapper {
        padding: 16px 0;
      }
      
      .email-container {
        border-radius: 0;
      }
      
      .email-header,
      .email-content {
        padding: 24px 16px;
      }
      
      .email-title {
        font-size: 22px;
      }
      
      .btn-primary {
        display: block;
        width: 100%;
      }
    }
  </style>
</head>
<body>
  <table class="email-wrapper" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center">
        <table class="email-container" cellpadding="0" cellspacing="0" border="0">
          ${headerHTML}
          ${contentHTML}
          ${renderEmailFooter()}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function renderHeader(header, logoUrl) {
  return `
    <tr>
      <td class="email-header">
        ${logoUrl ? `<img src="${logoUrl}" class="email-logo" alt="Logo">` : ''}
        ${header.icon ? `
          <div class="email-icon">
            <img src="/icons/${header.icon}.png" width="${header.iconSize || 48}" height="${header.iconSize || 48}" alt="${header.icon}">
          </div>
        ` : ''}
        <h1 class="email-title">${header.title}</h1>
        ${header.subtitle ? `<p class="email-subtitle">${header.subtitle}</p>` : ''}
      </td>
    </tr>
  `;
}

function renderContent(content) {
  let html = '<tr><td class="email-content">';
  
  // Intro
  if (content.intro) {
    html += `<p class="content-intro">${content.intro}</p>`;
  }
  
  // Sections
  if (content.sections && content.sections.length > 0) {
    content.sections.forEach(section => {
      html += '<div class="content-section">';
      
      if (section.title) {
        html += `<h2 class="section-title">${section.title}</h2>`;
      }
      
      switch (section.type) {
        case 'info-card':
          html += renderInfoCard(section.items);
          break;
        case 'list':
          html += renderList(section.items);
          break;
        case 'alert':
          html += renderAlert(section);
          break;
        case 'text':
          html += `<p>${section.content}</p>`;
          break;
        default:
          break;
      }
      
      html += '</div>';
    });
  }
  
  // CTA
  if (content.cta) {
    html += `
      <div class="cta-wrapper">
        <a href="${content.cta.url}" class="btn-primary">
          ${content.cta.icon ? `<img src="/icons/${content.cta.icon}.png" width="18" height="18" style="vertical-align: middle; margin-right: 8px;" alt="${content.cta.icon}">` : ''}
          ${content.cta.text}
        </a>
      </div>
    `;
  }
  
  // Footer
  if (content.footer) {
    html += '<div class="content-footer">';
    if (content.footer.text) {
      html += `<p class="footer-text">${content.footer.text}</p>`;
    }
    if (content.footer.hint) {
      html += `<p class="footer-hint">${content.footer.hint}</p>`;
    }
    html += '</div>';
  }
  
  html += '</td></tr>';
  return html;
}

function renderInfoCard(items) {
  let html = '<div class="info-card">';
  
  items.forEach(item => {
    html += `
      <div class="info-item">
        ${item.icon ? `
          <div class="info-item-icon">
            <img src="/icons/${item.icon}.png" width="20" height="20" alt="${item.icon}">
          </div>
        ` : ''}
        <div class="info-item-content">
          <p class="info-item-label">${item.label}</p>
          <p class="info-item-value">${item.value}</p>
        </div>
      </div>
    `;
  });
  
  html += '</div>';
  return html;
}

function renderList(items) {
  let html = '<ul class="content-list">';
  
  items.forEach(item => {
    html += `
      <li class="content-list-item">
        ${item.icon ? `<img src="/icons/${item.icon}.png" width="20" height="20" style="margin-right: 12px;" alt="${item.icon}">` : ''}
        <span>${item.text}</span>
      </li>
    `;
  });
  
  html += '</ul>';
  return html;
}

function renderAlert(section) {
  const alertClass = section.variant ? `alert-${section.variant}` : 'alert-info';
  return `
    <div class="alert ${alertClass}">
      ${section.icon ? `<img src="/icons/${section.icon}.png" width="20" height="20" style="margin-right: 12px; vertical-align: middle;" alt="${section.icon}">` : ''}
      ${section.content}
    </div>
  `;
}

function renderEmailFooter() {
  return `
    <tr>
      <td class="email-footer">
        <p class="footer-company">{{companyName}}</p>
        <p class="footer-address">{{companyAddress}}</p>
        <div style="margin-top: 16px;">
          <a href="{{whatsappUrl}}" class="footer-social">
            <img src="/icons/chat.png" width="18" height="18" style="vertical-align: middle; margin-right: 4px;" alt="WhatsApp">
            WhatsApp
          </a>
          <a href="mailto:{{supportEmail}}" class="footer-social">
            <img src="/icons/mail.png" width="18" height="18" style="vertical-align: middle; margin-right: 4px;" alt="Email">
            Email
          </a>
        </div>
      </td>
    </tr>
  `;
}
