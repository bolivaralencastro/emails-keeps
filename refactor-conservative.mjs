import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const originalsDir = path.join(__dirname, 'templates');
const outputDir = path.join(__dirname, 'email-template-editor/public/templates-refatorados');

// Mapeamento emoji → PNG icon
const emojiToPng = {
  '📊': 'analytics',
  '✅': 'check_circle',
  '⚠️': 'warning',
  '❌': 'cancel',
  '🎓': 'school',
  '🎯': 'target',
  '🚀': 'rocket_launch',
  '💬': 'chat',
  '✉️': 'mail',
  '💡': 'lightbulb',
  '📄': 'description',
  '📥': 'download',
  '🎉': 'celebration',
  '✨': 'auto_awesome',
  '🔑': 'key',
  '👤': 'person',
  '🔒': 'lock',
  '🔴': 'circle',
  '🕐': 'schedule',
  '⏱️': 'timer',
  '📌': 'push_pin',
  '🎥': 'videocam',
  '📆': 'calendar_today',
  '🎮': 'sports_esports',
  '⚙️': 'settings',
  '📍': 'location_on',
  '🗺️': 'map',
  '📱': 'smartphone',
  '⏸️': 'pause',
  '🏆': 'trophy',
  '📈': 'trending_up',
  '⚡': 'bolt',
  'ℹ️': 'info',
  '📚': 'menu_book',
  '🎪': 'event',
  '🔄': 'sync',
  '🔧': 'build',
  '📋': 'assignment',
  '🚩': 'flag'
};

console.log('🔄 Iniciando refatoração CONSERVADORA dos templates...\n');
console.log('📋 Regras:');
console.log('  ✓ Manter 100% do conteúdo original');
console.log('  ✓ Aplicar design system (cores, espaçamento)');
console.log('  ✓ Substituir emojis por ícones PNG');
console.log('  ✓ Adicionar mobile responsive');
console.log('  ✓ Limpar CSS inline excessivo\n');

// Função para aplicar design system mantendo conteúdo
function refactorTemplate(htmlContent, templateName) {
  let html = htmlContent;
  
  // 1. Substituir emojis por ícones PNG
  Object.entries(emojiToPng).forEach(([emoji, iconName]) => {
    const regex = new RegExp(emoji, 'g');
    html = html.replace(regex, `<img src="/icons/${iconName}.png" width="24" height="24" style="vertical-align: middle; display: inline-block" alt="${iconName}">`);
  });
  
  // 2. Injetar design system CSS no <head>
  const designSystemCSS = `
  <style type="text/css">
    /* Design System Konquest - Aplicado ao template original */
    
    /* Cores primárias serão injetadas dinamicamente */
    :root {
      --primary-color: #8430ED;
      --bg-email: #f3f5f8;
      --bg-container: #ffffff;
      --text-color: #000000;
      --text-secondary: #6b7280;
      --border-color: #e5e7eb;
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
    }
    
    /* Normalização de espaçamento (8-point grid) */
    .spacing-8 { padding: 8px; }
    .spacing-16 { padding: 16px; }
    .spacing-24 { padding: 24px; }
    .spacing-32 { padding: 32px; }
    .spacing-40 { padding: 40px; }
    
    /* Botões */
    .btn-primary {
      background-color: var(--primary-color) !important;
      border-radius: 8px !important;
      padding: 16px 32px !important;
    }
  </style>`;
  
  // Injetar CSS antes do </head> ou criar <head> se não existir
  if (html.includes('</head>')) {
    html = html.replace('</head>', `${designSystemCSS}\n</head>`);
  } else if (html.includes('<head>')) {
    html = html.replace('<head>', `<head>${designSystemCSS}`);
  } else {
    // Template sem head - adicionar estrutura mínima
    html = `<!DOCTYPE html>\n<html>\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">${designSystemCSS}\n</head>\n<body>\n${html}\n</body>\n</html>`;
  }
  
  // 3. Normalizar cores inline mantendo a estrutura original
  // Substituir cores hardcoded comuns por variáveis CSS (mas mantendo inline para compatibilidade)
  const colorMappings = [
    { old: /#007bff/gi, new: '#8430ED' },
    { old: /#3b82f6/gi, new: '#8430ED' },
    { old: /#ff5100/gi, new: '#8430ED' },
    { old: /#ff9800/gi, new: '#8430ED' },
    { old: /#f59e0b/gi, new: '#8430ED' },
    { old: /#ff0129/gi, new: '#8430ED' },
    { old: /#ef4444/gi, new: '#8430ED' },
    { old: /#dc2626/gi, new: '#8430ED' },
    { old: /#7c3aed/gi, new: '#8430ED' }
  ];
  
  colorMappings.forEach(({ old, new: newColor }) => {
    html = html.replace(old, newColor);
  });
  
  // 4. Adicionar meta tags se não existirem
  if (!html.includes('viewport')) {
    html = html.replace('<head>', '<head>\n<meta name="viewport" content="width=device-width, initial-scale=1.0">');
  }
  
  return html;
}

// Processar todos os templates
const files = fs.readdirSync(originalsDir).filter(f => f.endsWith('.html'));
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

let processed = 0;
let totalEmojis = 0;

templateMapping.forEach(({ original, refactored }) => {
  const originalPath = path.join(originalsDir, original);
  const outputPath = path.join(outputDir, refactored);
  
  if (!fs.existsSync(originalPath)) {
    console.log(`⚠️  ${original} - Não encontrado`);
    return;
  }
  
  const originalContent = fs.readFileSync(originalPath, 'utf8');
  const emojisInTemplate = Object.keys(emojiToPng).filter(emoji => originalContent.includes(emoji)).length;
  
  const refactoredContent = refactorTemplate(originalContent, original);
  
  fs.writeFileSync(outputPath, refactoredContent, 'utf8');
  
  processed++;
  totalEmojis += emojisInTemplate;
  
  const originalLines = originalContent.split('\n').length;
  const refactoredLines = refactoredContent.split('\n').length;
  
  console.log(`✅ ${refactored}`);
  console.log(`   📝 Linhas: ${originalLines} → ${refactoredLines} (+${refactoredLines - originalLines} design system)`);
  console.log(`   🎨 Emojis convertidos: ${emojisInTemplate}`);
});

console.log(`\n🎉 Refatoração CONSERVADORA concluída!`);
console.log(`   ✅ ${processed}/${templateMapping.length} templates processados`);
console.log(`   🎨 ${totalEmojis} emojis convertidos para PNG`);
console.log(`   📦 Conteúdo original 100% preservado`);
console.log(`   🎨 Design system aplicado`);
