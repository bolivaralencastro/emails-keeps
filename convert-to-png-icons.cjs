#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const templatesDir = './public/templates-refatorados';
const files = fs.readdirSync(templatesDir).filter(f => f.endsWith('.html'));

console.log(`🔄 Convertendo ${files.length} templates para usar PNG icons...\n`);

let totalReplacements = 0;

files.forEach(file => {
  const filePath = path.join(templatesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let replacements = 0;
  
  // Padrão: <span class="material-symbols-outlined" style="font-size: XXpx; ...">icon_name</span>
  // Substituir por: <img src="/icons/icon_name.png" width="XX" height="XX" style="..." alt="icon_name">
  
  const regex = /<span class="material-symbols-outlined"[^>]*style="[^"]*font-size:\s*(\d+)px;?([^"]*)"[^>]*>([a-z_]+)<\/span>/gi;
  
  content = content.replace(regex, (match, fontSize, otherStyles, iconName) => {
    replacements++;
    
    // Manter estilos relevantes (remover font-size já que o tamanho vem do width/height)
    let imgStyle = otherStyles.trim();
    
    // Adicionar display e vertical-align se não estiverem presentes
    if (!imgStyle.includes('vertical-align')) {
      imgStyle += '; vertical-align: middle';
    }
    if (!imgStyle.includes('display')) {
      imgStyle += '; display: inline-block';
    }
    
    // Limpar ; duplicados
    imgStyle = imgStyle.replace(/;\s*;/g, ';').replace(/^;\s*/, '').replace(/\s*;$/, '');
    
    return `<img src="/icons/${iconName}.png" width="${fontSize}" height="${fontSize}" style="${imgStyle}" alt="${iconName}">`;
  });
  
  // Remover links do Google Fonts Material Symbols
  content = content.replace(/<link[^>]*Material\+Symbols[^>]*>\s*/gi, '');
  
  // Remover CSS do Material Symbols
  content = content.replace(/\/\*\s*Material Symbols\s*\*\/[\s\S]*?\.material-symbols-outlined\s*\{[\s\S]*?\}\s*/gi, '');
  
  fs.writeFileSync(filePath, content, 'utf8');
  
  console.log(`✅ ${file}: ${replacements} ícones convertidos`);
  totalReplacements += replacements;
});

console.log(`\n🎉 Total: ${totalReplacements} ícones convertidos em ${files.length} templates!`);
console.log(`📧 Templates prontos para email clients (compatibilidade 99%)`);
