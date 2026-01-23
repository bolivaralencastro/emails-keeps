import { replaceVariablesInTemplate } from './variableReplacer';
import tinycolor from 'tinycolor2';

// Gera 10 steps de uma cor primária
const generateColorSteps = (primaryColor) => {
  const base = tinycolor(primaryColor);
  
  return {
    50: base.clone().lighten(45).toString(),   // Muito claro
    100: base.clone().lighten(40).toString(),
    200: base.clone().lighten(30).toString(),
    300: base.clone().lighten(20).toString(),
    400: base.clone().lighten(10).toString(),
    500: primaryColor,                          // Cor base
    600: base.clone().darken(10).toString(),
    700: base.clone().darken(20).toString(),
    800: base.clone().darken(30).toString(),
    900: base.clone().darken(40).toString(),    // Muito escuro
  };
};

export const applyDesignTokens = (htmlContent, designSystem) => {
  if (!htmlContent) return '';
  
  let modifiedHtml = htmlContent;
  
  // Primeiro, substituir variáveis dinâmicas
  if (designSystem.variables) {
    modifiedHtml = replaceVariablesInTemplate(modifiedHtml, designSystem.variables);
  }
  
  // Gerar tonalidades da cor primária
  const colorSteps = generateColorSteps(designSystem.primaryColor);
  
  // Cores fixas do sistema
  const colors = {
    primary: colorSteps[500],
    primary50: colorSteps[50],
    primary100: colorSteps[100],
    primary200: colorSteps[200],
    primary300: colorSteps[300],
    primary400: colorSteps[400],
    primary500: colorSteps[500],
    primary600: colorSteps[600],
    primary700: colorSteps[700],
    primary800: colorSteps[800],
    primary900: colorSteps[900],
    
    // Cores fixas do sistema (não customizáveis)
    text: '#000000',
    textSecondary: '#6b7280',
    textTertiary: '#9ca3af',
    
    bgEmail: '#f3f5f8',      // Fundo do email (cinza claro)
    bgContainer: '#ffffff',  // Container (branco)
    
    border: '#e5e7eb',
    borderLight: '#f3f4f6',
  };
  
  // Check if HTML is a complete document or just a fragment
  const isFragment = !htmlContent.toLowerCase().includes('<!doctype') && 
                     !htmlContent.toLowerCase().includes('<html');

  const cssVariables = `
<style type="text/css">
  /* Material Symbols Font Face */
  @font-face {
    font-family: 'Material Symbols Outlined';
    font-style: normal;
    font-weight: 100 700;
    src: url(/fonts/material-symbols-outlined.woff2) format('woff2');
  }
  
  /* Material Symbols */
  .material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-weight: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    font-feature-settings: 'liga';
    vertical-align: middle;
  }
  
  /* Reset e Base */
  body, table, td, div, p, span { 
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
  }
  
  /* ========================================
     SUBSTITUIÇÃO AGRESSIVA DE CORES PRIMÁRIAS
     Todas as cores de brand devem usar a cor primária
     ======================================== */
  
  /* BACKGROUNDS PRIMÁRIOS - Azuis */
  [style*="background-color: #007bff"],
  [style*="background-color:#007bff"],
  [style*="background-color: #3b82f6"],
  [style*="background-color:#3b82f6"],
  [style*="background-color: #2682fa"],
  [style*="background-color:#2682fa"],
  
  /* BACKGROUNDS PRIMÁRIOS - Laranjas/Vermelhos */
  [style*="background-color: #ff5100"],
  [style*="background-color:#ff5100"],
  [style*="background-color: #ff9800"],
  [style*="background-color:#ff9800"],
  [style*="background-color: #f59e0b"],
  [style*="background-color:#f59e0b"],
  [style*="background-color: #ff0129"],
  [style*="background-color:#ff0129"],
  [style*="background-color: #ef4444"],
  [style*="background-color:#ef4444"],
  [style*="background-color: #dc2626"],
  [style*="background-color:#dc2626"],
  [style*="background-color: #FF6B35"],
  [style*="background-color:#FF6B35"],
  [style*="background-color: #F7931E"],
  [style*="background-color:#F7931E"],
  
  /* BACKGROUNDS PRIMÁRIOS - Verdes */
  [style*="background-color: #10b981"],
  [style*="background-color:#10b981"],
  [style*="background-color: #25d366"],
  [style*="background-color:#25d366"],
  [style*="background-color: #059669"],
  [style*="background-color:#059669"],
  [style*="background-color: #28a745"],
  [style*="background-color:#28a745"],
  [style*="background-color: #2cb543"],
  [style*="background-color:#2cb543"],
  [style*="background-color: #42d159"],
  [style*="background-color:#42d159"],
  
  /* BACKGROUNDS PRIMÁRIOS - Roxos */
  [style*="background-color: #7c3aed"],
  [style*="background-color:#7c3aed"],
  
  /* Classes de brand */
  .brand-primary,
  [class*="brand-primary"] {
    background-color: ${colors.primary} !important;
  }
  
  /* Backgrounds claros (50-200) - Tons pasteis */
  [style*="background-color: #e7f3ff"],
  [style*="background-color:#e7f3ff"],
  [style*="background-color: #fff3e0"],
  [style*="background-color:#fff3e0"],
  [style*="background-color: #fee2e2"],
  [style*="background-color:#fee2e2"],
  [style*="background-color: #ecfdf5"],
  [style*="background-color:#ecfdf5"] {
    background-color: ${colors.primary50} !important;
  }
  
  /* CORES DE TEXTO PRIMÁRIAS */
  [style*="color: #007bff"],
  [style*="color:#007bff"],
  [style*="color: #3b82f6"],
  [style*="color:#3b82f6"],
  [style*="color: #2682fa"],
  [style*="color:#2682fa"],
  [style*="color: #2cb543"],
  [style*="color:#2cb543"],
  [style*="color: #42d159"],
  [style*="color:#42d159"],
  [style*="color: #ff5100"],
  [style*="color:#ff5100"],
  [style*="color: #ff9800"],
  [style*="color:#ff9800"],
  [style*="color: #f59e0b"],
  [style*="color:#f59e0b"],
  [style*="color: #ff0129"],
  [style*="color:#ff0129"],
  [style*="color: #ef4444"],
  [style*="color:#ef4444"],
  [style*="color: #dc2626"],
  [style*="color:#dc2626"],
  [style*="color: #FF6B35"],
  [style*="color:#FF6B35"],
  [style*="color: #10b981"],
  [style*="color:#10b981"],
  [style*="color: #25d366"],
  [style*="color:#25d366"],
  [style*="color: #7c3aed"],
  [style*="color:#7c3aed"],
  .text-primary,
  .text-brand-primary {
    color: ${colors.primary} !important;
  }
  
  /* BORDAS PRIMÁRIAS */
  [style*="border-color: #007bff"],
  [style*="border-color:#007bff"],
  [style*="border-color: #3b82f6"],
  [style*="border-color:#3b82f6"],
  [style*="border-color: #ff5100"],
  [style*="border-color:#ff5100"],
  [style*="border-color: #ff9800"],
  [style*="border-color:#ff9800"],
  [style*="border-color: #f59e0b"],
  [style*="border-color:#f59e0b"],
  [style*="border-color: #ff0129"],
  [style*="border-color:#ff0129"],
  [style*="border-color: #ef4444"],
  [style*="border-color:#ef4444"],
  [style*="border-color: #dc2626"],
  [style*="border-color:#dc2626"],
  [style*="border-color: #10b981"],
  [style*="border-color:#10b981"],
  [style*="border: 2px solid #007bff"],
  [style*="border: 2px solid #ff9800"],
  [style*="border: 2px solid #ff5100"],
  [style*="border-left: 4px solid #007bff"],
  [style*="border-left: 4px solid #ff9800"],
  [style*="border-left: 4px solid #ff5100"] {
    border-color: ${colors.primary} !important;
  }
  
  /* Headings - sempre preto */
  h1, h2, h3, h4, h5, h6,
  .heading-1, .heading-2, .heading-3, .heading-4,
  .display { 
    color: ${colors.text} !important; 
  }
  
  /* Botões primários */
  .btn,
  .btn-primary,
  a[href][style*="background-color"],
  table[role="presentation"][style*="background-color"] td[style*="background-color"] {
    background-color: ${colors.primary} !important;
    color: white !important;
  }
  
  .btn:hover,
  .btn-primary:hover {
    background-color: ${colors.primary600} !important;
  }
  
  /* Botões secundários (outline) */
  .btn-secondary,
  a[style*="border: 2px solid"] {
    border-color: ${colors.primary} !important;
    color: ${colors.primary} !important;
    background-color: transparent !important;
  }
  
  /* Background do email - sempre cinza claro (NÃO SOBRESCREVER) */
  body,
  body > table[style*="background-color: #f3f5f8"],
  .bg-gray-light {
    background-color: ${colors.bgEmail} !important;
  }
  
  /* Background do container - sempre branco (NÃO SOBRESCREVER) */
  .bg-white,
  .container,
  table.container,
  table[width="600"][style*="background-color: #ffffff"] {
    background-color: ${colors.bgContainer} !important;
  }
  
  /* Text colors - preto/cinza (NÃO SOBRESCREVER) */
  [style*="color: #111827"],
  [style*="color:#111827"],
  [style*="color: #000000"],
  [style*="color:#000000"],
  [style*="color: #6b7280"],
  [style*="color:#6b7280"],
  [style*="color: #9ca3af"],
  [style*="color:#9ca3af"],
  p, span, td:not([style*="background-color"]), div,
  .body,
  .text-secondary {
    color: ${colors.text} !important;
  }
  
  /* Bordas neutras (NÃO SOBRESCREVER) */
  [style*="border-color: #e5e7eb"],
  [style*="border-color:#e5e7eb"],
  [style*="border-color: #ebebeb"],
  [style*="border-color:#ebebeb"],
  [style*="border-color: #d1d5db"],
  [style*="border-color:#d1d5db"] {
    border-color: ${colors.border} !important;
  }
  
  /* Logo replacement */
  ${designSystem.logoUrl ? `
    img[src*="logo"], 
    img[alt*="logo"], 
    img[alt*="Logo"],
    img[src*="{{logoUrl}}"],
    img[src*="{{company_logo}}"],
    img[src*="{{workspace_logo}}"] { 
      content: url(${designSystem.logoUrl}) !important;
      max-width: 150px !important;
    }
  ` : ''}
  
  /* Links */
  a {
    color: ${colors.primary} !important;
  }
  
  a:hover {
    color: ${colors.primary700} !important;
  }
</style>
`;

  // If it's a fragment, wrap it in a complete HTML document
  if (isFragment) {
    modifiedHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${cssVariables}
</head>
<body style="margin: 0; padding: 0; background-color: ${colors.bgEmail};">
  ${modifiedHtml}
</body>
</html>`;
  } else {
    // É um documento completo - NÃO precisa do link externo do Google, usa @font-face local
    
    // Remover links externos do Material Symbols se existirem
    modifiedHtml = modifiedHtml.replace(/<link[^>]*Material\+Symbols[^>]*>/gi, '');
    
    // SEMPRE inserir o CSS customizado com @font-face local
    if (modifiedHtml.includes('</head>')) {
      // Inserir antes do </head>
      modifiedHtml = modifiedHtml.replace('</head>', `${cssVariables}\n</head>`);
    } else if (modifiedHtml.includes('</style>')) {
      // Se não tem </head> mas tem </style>, inserir após o último </style>
      const lastStyleIndex = modifiedHtml.lastIndexOf('</style>');
      modifiedHtml = modifiedHtml.substring(0, lastStyleIndex + 8) + 
                     '\n' + cssVariables + 
                     modifiedHtml.substring(lastStyleIndex + 8);
    } else if (modifiedHtml.includes('<body')) {
      // Última alternativa: antes do <body>
      modifiedHtml = modifiedHtml.replace('<body', `${cssVariables}\n<body`);
    } else {
      // Sem estrutura reconhecível, apenas adicionar no início
      modifiedHtml = cssVariables + modifiedHtml;
    }
  }

  return modifiedHtml;
};

export const defaultDesignSystem = {
  // Apenas a cor primária é customizável
  primaryColor: '#8430ED', // Roxo Konquest
  
  // Logo
  logoUrl: '',
  
  // Variáveis de conteúdo dinâmico
  variables: {
    // Usuário
    user_name: 'João Silva',
    user_email: 'joao.silva@exemplo.com',
    user_login: 'joao.silva',
    user_phone: '(11) 98765-4321',
    
    // Empresa/Workspace
    company: 'Minha Empresa',
    workspace_name: 'Workspace Principal',
    workspace_logo: '',
    company_logo: '',
    
    // Missão/Curso
    mission_name: 'Treinamento de Vendas',
    mission_link: '#',
    mission_start_date: '2026-02-01',
    mission_start_time: '14:00',
    mission_seats: '30',
    mission_address: 'Rua Exemplo, 123',
    mission_vertical_cover_image: '',
    
    // Trilha
    learning_trail_name: 'Trilha de Liderança',
    trail_name: 'Trilha de Liderança',
    learning_trail_link: '#',
    learning_trail_vertical_cover_image: '',
    
    // Relatório
    report_name: 'Relatório Mensal',
    report_url: '#',
    
    // Datas
    enrollment_goal_date: '2026-03-01',
    enrollment_created_date: '2026-01-22',
    days_to_expire: '7',
    days_remaining: '5',
    
    // Links
    app_web_link: 'https://app.exemplo.com',
    konquest_web_url: 'https://konquest.exemplo.com',
    konquest_certificate_web_url: '#',
  }
};
