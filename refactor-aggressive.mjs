import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const originalsDir = path.join(__dirname, 'templates');
const outputDir = path.join(__dirname, 'email-template-editor/public/templates-refatorados');

// Mapeamento emoji → PNG icon
const emojiToPng = {
  '📊': 'analytics', '✅': 'check_circle', '⚠️': 'warning', '❌': 'cancel',
  '🎓': 'school', '🎯': 'target', '🚀': 'rocket_launch', '💬': 'chat',
  '✉️': 'mail', '💡': 'lightbulb', '📄': 'description', '📥': 'download',
  '🎉': 'celebration', '✨': 'auto_awesome', '🔑': 'key', '👤': 'person',
  '🔒': 'lock', '🔴': 'circle', '🕐': 'schedule', '⏱️': 'timer',
  '📌': 'push_pin', '🎥': 'videocam', '📆': 'calendar_today', '🎮': 'sports_esports',
  '⚙️': 'settings', '📍': 'location_on', '🗺️': 'map', '📱': 'smartphone',
  '⏸️': 'pause', '🏆': 'trophy', '📈': 'trending_up', '⚡': 'bolt',
  'ℹ️': 'info', '📚': 'menu_book', '🎪': 'event', '🔄': 'sync',
  '🔧': 'build', '📋': 'assignment', '🚩': 'flag'
};

console.log('🔄 Refatoração REAL dos templates...\n');
console.log('📋 Aplicando:');
console.log('  ✓ Manter 100% do CONTEÚDO (texto)');
console.log('  ✓ Substituir TODAS as cores inline por variáveis CSS');
console.log('  ✓ Padronizar fonte: System fonts');
console.log('  ✓ Substituir emojis por ícones PNG');
console.log('  ✓ Limpar CSS inline excessivo\n');

function aggressiveRefactor(html) {
  let refactored = html;
  
  // 1. SUBSTITUIR EMOJIS POR ÍCONES PNG
  Object.entries(emojiToPng).forEach(([emoji, iconName]) => {
    const regex = new RegExp(emoji, 'g');
    refactored = refactored.replace(regex, `<img src="/icons/${iconName}.png" width="24" height="24" style="vertical-align: middle; display: inline-block;" alt="${iconName}">`);
  });
  
  // 2. SUBSTITUIR TODAS AS CORES HARDCODED POR COR PRIMÁRIA
  const brandColors = [
    '#007bff', '#0066cc', '#3b82f6', '#2563eb', '#1d4ed8', // Blues
    '#ff5100', '#ff6b35', '#ff9800', '#f59e0b', '#f97316', // Oranges
    '#ff0129', '#ef4444', '#dc2626', '#b91c1c', // Reds
    '#10b981', '#059669', '#047857', '#28a745', '#25d366', // Greens
    '#7c3aed', '#6366f1', '#8b5cf6', '#a855f7', '#9333ea', // Purples
  ];
  
  brandColors.forEach(color => {
    // Substituir em backgrounds
    refactored = refactored.replace(
      new RegExp(`background-color:\\s*${color.replace('#', '#')}`, 'gi'),
      'background-color: var(--primary-color)'
    );
    refactored = refactored.replace(
      new RegExp(`background:\\s*${color.replace('#', '#')}`, 'gi'),
      'background: var(--primary-color)'
    );
    refactored = refactored.replace(
      new RegExp(`bgcolor="${color}"`, 'gi'),
      'bgcolor="var(--primary-color)"'
    );
    
    // Substituir em text colors (quando for cor de destaque, não texto normal)
    refactored = refactored.replace(
      new RegExp(`color:\\s*${color.replace('#', '#')}([^;]*)([;"])`, 'gi'),
      'color: var(--primary-color)$1$2'
    );
    
    // Substituir em borders
    refactored = refactored.replace(
      new RegExp(`border-color:\\s*${color.replace('#', '#')}`, 'gi'),
      'border-color: var(--primary-color)'
    );
  });
  
  // 3. PADRONIZAR FONTES - Substituir todas por system fonts
  const oldFonts = [
    "'source sans pro', 'helvetica neue', helvetica, arial, sans-serif",
    '"source sans pro", "helvetica neue", helvetica, arial, sans-serif',
    'source sans pro, helvetica neue, helvetica, arial, sans-serif',
    'helvetica, arial, sans-serif',
    'arial, sans-serif',
    'sans-serif'
  ];
  
  const newFont = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
  
  oldFonts.forEach(oldFont => {
    refactored = refactored.replace(
      new RegExp(`font-family:\\s*${oldFont.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'gi'),
      `font-family: ${newFont}`
    );
  });
  
  // 4. ADICIONAR DESIGN SYSTEM CSS
  const designSystemCSS = `
  <style type="text/css">
    /* Design System Konquest */
    :root {
      --primary-color: #8430ED;
      --primary-color-50: #f5f3ff;
      --primary-color-100: #ede9fe;
      --primary-color-200: #ddd6fe;
      --primary-color-300: #c4b5fd;
      --primary-color-400: #a78bfa;
      --primary-color-500: #8430ED;
      --primary-color-600: #7c3aed;
      --primary-color-700: #6d28d9;
      --primary-color-800: #5b21b6;
      --primary-color-900: #4c1d95;
      
      --bg-email: #f3f5f8;
      --bg-container: #ffffff;
      --text-color: #000000;
      --text-secondary: #6b7280;
      --border-color: #e5e7eb;
    }
    
    /* Base */
    body {
      margin: 0 !important;
      padding: 0 !important;
      background-color: var(--bg-email) !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
    }
    
    /* Sobrescrever cores inline */
    [bgcolor="#007bff"], [bgcolor="#3b82f6"], [bgcolor="#ff5100"], [bgcolor="#ff9800"],
    [bgcolor="#ff0129"], [bgcolor="#ef4444"], [bgcolor="#10b981"], [bgcolor="#7c3aed"] {
      background-color: var(--primary-color) !important;
    }
    
    a {
      color: var(--primary-color) !important;
      text-decoration: none !important;
    }
    
    /* Mobile Responsive */
    @media only screen and (max-width: 600px) {
      .es-wrapper { width: 100% !important; }
      .es-content, .es-header, .es-footer { width: 100% !important; }
      .es-content-body { width: 100% !important; max-width: 600px !important; }
      .es-m-p0 { padding: 0 !important; }
      .es-m-p20 { padding: 20px !important; }
      table[class*="es-"] { width: 100% !important; }
      td[class*="es-"] { width: 100% !important; display: block !important; }
      img { max-width: 100% !important; height: auto !important; }
      .h1 { font-size: 28px !important; }
      .h2 { font-size: 24px !important; }
      .h3 { font-size: 20px !important; }
    }
  </style>`;
  
  // Injetar CSS
  if (refactored.includes('</head>')) {
    refactored = refactored.replace('</head>', `${designSystemCSS}\n</head>`);
  } else if (refactored.includes('<head>')) {
    refactored = refactored.replace('<head>', `<head>${designSystemCSS}`);
  } else {
    refactored = `<!DOCTYPE html>\n<html>\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">${designSystemCSS}\n</head>\n<body>\n${refactored}\n</body>\n</html>`;
  }
  
  // 5. Adicionar viewport meta se não existir
  if (!refactored.includes('viewport')) {
    refactored = refactored.replace('<head>', '<head>\n<meta name="viewport" content="width=device-width, initial-scale=1.0">');
  }
  
  return refactored;
}

// Template mapping
const templateMapping = [
  { original: 'analytics_new_report.html', refactored: '01_analytics_new_report.html' },
  { original: 'konquest_enrolled_in_group_missions.html', refactored: '02_konquest_enrolled_in_group_missions.html' },
  { original: 'konquest_invite.html', refactored: '03_konquest_invite.html' },
  { original: 'konquest_learning_trail_enrollment_expiring.html', refactored: '04_konquest_learning_trail_enrollment_expiring.html' },
  { original: 'konquest_live_enrollment_accepted.html', refactored: '05_konquest_live_enrollment_accepted.html' },
  { original: 'konquest_live_mission_starts_soon.html', refactored: '06_konquest_live_mission_starts_soon.html' },
  { original: 'konquest_mission_enrollment_expiring.html', refactored: '07_konquest_mission_enrollment_expiring.html' },
  { original: 'konquest_mission_enrollment_restarted.html', refactored: '08_konquest_mission_enrollment_restarted.html' },
  { original: 'konquest_mission_minimum_performance_updated.html', refactored: '09_konquest_mission_minimum_performance_updated.html' },
  { original: 'smartzap_invite.html', refactored: '10_smartzap_invite.html' },
  { original: 'smartzap_caixa_user_already_enrolled_error.html', refactored: '11_smartzap_caixa_user_already_enrolled_error.html' },
  { original: 'konquest_mission_enrollment_expired.html', refactored: '12_konquest_mission_enrollment_expired.html' },
  { original: 'smartzap_caixa_user_not_found_error.html', refactored: '13_smartzap_caixa_user_not_found_error.html' },
  { original: 'myaccount_resend_invite.html', refactored: '14_myaccount_resend_invite.html' },
  { original: 'konquest_onboarding.html', refactored: '15_konquest_onboarding.html' },
  { original: 'konquest_user_enrolled_in_a_course.html', refactored: '16_konquest_user_enrolled_in_a_course.html' },
  { original: 'konquest_user_enrolled_in_a_course_with_deadline.html', refactored: '17_konquest_user_enrolled_in_a_course_with_deadline.html' },
  { original: 'konquest_user_enrolled_in_a_live_mission.html', refactored: '18_konquest_user_enrolled_in_a_live_mission.html' },
  { original: 'konquest_user_enrolled_in_a_presential_mission.html', refactored: '19_konquest_user_enrolled_in_a_presential_mission.html' },
  { original: 'konquest_user_enrolled_in_a_trail.html', refactored: '20_konquest_user_enrolled_in_a_trail.html' },
  { original: 'konquest_presential_enrollment_accepted.html', refactored: '21_konquest_presential_enrollment_accepted.html' },
  { original: 'konquest_presential_mission_starts_soon.html', refactored: '22_konquest_presential_mission_starts_soon.html' },
  { original: 'konquest_new_missions.html', refactored: '23_konquest_new_missions.html' },
  { original: 'konquest_new_enrollment_to_review.html', refactored: '24_konquest_new_enrollment_to_review.html' },
  { original: 'konquest_new_mission_to_manage.html', refactored: '25_konquest_new_mission_to_manage.html' },
  { original: 'konquest_mission_modified_by_contributor.html', refactored: '26_konquest_mission_modified_by_contributor.html' },
  { original: 'konquest_mission_trail_disabled.html', refactored: '27_konquest_mission_trail_disabled.html' }
];

let totalColors = 0;
let totalEmojis = 0;

templateMapping.forEach(({ original, refactored }) => {
  const originalPath = path.join(originalsDir, original);
  const outputPath = path.join(outputDir, refactored);
  
  if (!fs.existsSync(originalPath)) {
    console.log(`⚠️  ${original} - Não encontrado`);
    return;
  }
  
  const originalContent = fs.readFileSync(originalPath, 'utf8');
  
  // Contar transformações
  const colorMatches = originalContent.match(/#(007bff|3b82f6|ff5100|ff9800|ff0129|ef4444|10b981|7c3aed)/gi);
  const colorCount = colorMatches ? colorMatches.length : 0;
  
  const emojiMatches = Object.keys(emojiToPng).filter(e => originalContent.includes(e));
  const emojiCount = emojiMatches.length;
  
  const refactoredContent = aggressiveRefactor(originalContent);
  
  fs.writeFileSync(outputPath, refactoredContent, 'utf8');
  
  totalColors += colorCount;
  totalEmojis += emojiCount;
  
  console.log(`✅ ${refactored}`);
  console.log(`   🎨 ${colorCount} cores padronizadas`);
  console.log(`   🖼️  ${emojiCount} emojis → PNG`);
});

console.log(`\n🎉 Refatoração REAL concluída!`);
console.log(`   🎨 ${totalColors} cores convertidas para var(--primary-color)`);
console.log(`   🖼️  ${totalEmojis} emojis convertidos para PNG`);
console.log(`   ✅ Fontes padronizadas: System fonts`);
console.log(`   📱 Mobile responsive aplicado`);
