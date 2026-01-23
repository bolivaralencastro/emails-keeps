// Sistema para substituir variáveis nos templates compilados
export const replaceVariablesInTemplate = (htmlContent, variables) => {
  if (!htmlContent || !variables) return htmlContent;
  
  let modified = htmlContent;
  
  // Estratégias de substituição baseadas em padrões encontrados nos templates
  
  // 1. Substituir nomes de usuário comuns em maiúsculas
  const userNamePatterns = [
    /SIMONE PROVEZANO BISCOTO/gi,
    /JONAS DE SOUZA GUIMARAES/gi,
    /VERÔNICA DAS GRAÇAS DE OLIVEIRA COUTINHO/gi,
    /NELSON SEBASTIAN CABUYA ANAYA/gi,
  ];
  
  if (variables.user_name) {
    userNamePatterns.forEach(pattern => {
      modified = modified.replace(pattern, variables.user_name);
    });
    
    // Buscar padrões genéricos de nome (palavras todas em maiúsculas, 2-4 palavras)
    modified = modified.replace(
      /\b([A-ZÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜ]{2,}\s+){1,3}[A-ZÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜ]{2,}\b/g,
      (match) => {
        // Não substituir se for parte de um título ou cabeçalho conhecido
        if (match.includes('BDMG') || match.includes('KEEPS') || match.includes('KONQUEST')) {
          return match;
        }
        return variables.user_name;
      }
    );
  }
  
  // 2. Substituir nomes de missões/cursos
  const missionNamePatterns = [
    /Treinamento Agro negócios/gi,
    /A História do Grupo: COMVENE/gi,
    /Entendendo e lidando com a Ansiedade/gi,
  ];
  
  if (variables.mission_name) {
    missionNamePatterns.forEach(pattern => {
      modified = modified.replace(pattern, variables.mission_name);
    });
  }
  
  // 3. Substituir trilhas
  const trailPatterns = [
    /Trilha Comercial \| Excelência em Vendas Consultivas/gi,
    /Trilha de Liderança/gi,
  ];
  
  if (variables.learning_trail_name || variables.trail_name) {
    const trailName = variables.learning_trail_name || variables.trail_name;
    trailPatterns.forEach(pattern => {
      modified = modified.replace(pattern, trailName);
    });
  }
  
  // 4. Substituir logos por URLs
  if (variables.workspace_logo || variables.company_logo) {
    const logoUrl = variables.workspace_logo || variables.company_logo;
    // Substituir imagens que parecem ser logos
    modified = modified.replace(
      /(https:\/\/media\.keepsdev\.com\/myaccount\/workspace-logo\/[^"'\s]+)/gi,
      logoUrl || '$1'
    );
  }
  
  // 5. Substituir links de missões
  if (variables.mission_link) {
    modified = modified.replace(
      /(https:\/\/konquest\.keepsdev\.com\/[^"'\s]+\/[CE]\/[^"'\s]+)/gi,
      variables.mission_link
    );
  }
  
  // 6. Substituir datas
  if (variables.enrollment_goal_date) {
    // Formato YYYY-MM-DD
    modified = modified.replace(
      /\d{4}-\d{2}-\d{2}/g,
      variables.enrollment_goal_date
    );
  }
  
  // 7. Substituir números (dias restantes, vagas, etc)
  if (variables.days_to_expire) {
    modified = modified.replace(
      /(\d+)\s*(dias?|day|days)/gi,
      `${variables.days_to_expire} $2`
    );
  }
  
  if (variables.mission_seats) {
    // Procurar por padrões de vagas
    modified = modified.replace(
      /(\d+)\s*(vagas?|seats?)/gi,
      `${variables.mission_seats} $2`
    );
  }
  
  // 8. Substituir nomes de empresa
  if (variables.company || variables.workspace_name) {
    const companyName = variables.company || variables.workspace_name;
    const companyPatterns = [
      /Mobiflix/gi,
      /COMVENE/gi,
      /Biolovers/gi,
      /BDMG Aprende/gi,
    ];
    
    companyPatterns.forEach(pattern => {
      modified = modified.replace(pattern, companyName);
    });
  }
  
  // 9. Substituir imagens de capa
  if (variables.mission_vertical_cover_image) {
    modified = modified.replace(
      /(https:\/\/media\.keepsdev\.com\/konquest\/cover-image\/[^"'\s]+)/gi,
      variables.mission_vertical_cover_image || '$1'
    );
  }
  
  if (variables.learning_trail_vertical_cover_image) {
    modified = modified.replace(
      /(https:\/\/.*cover.*\.(jpg|png|jpeg|gif))/gi,
      variables.learning_trail_vertical_cover_image || '$1'
    );
  }
  
  return modified;
};
