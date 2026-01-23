# Sistema de Variáveis de Templates

## Variáveis Implementadas (61 total)

### 👤 Usuário (8 variáveis)
- `user_name` - Nome do Usuário
- `user_email` - Email do Usuário  
- `user_login` - Login do Usuário
- `user_phone` - Telefone do Usuário
- `userId`, `userName`, `user_id`, `user_password`

### 🏢 Empresa/Workspace (11 variáveis)
- `company` - Nome da Empresa
- `workspace_name` - Nome do Workspace
- `workspace_logo` - URL do Logo do Workspace
- `company_logo` - URL do Logo da Empresa
- `workspaceColor`, `workspaceContrastColor`, `workspaceId`, `workspace_icon`, etc.

### 🎯 Missão/Curso (23 variáveis)
- `mission_name` - Nome da Missão
- `mission_link` - Link da Missão
- `mission_start_date` - Data de Início
- `mission_start_time` - Horário de Início
- `mission_seats` - Vagas Disponíveis
- `mission_address` - Endereço
- `mission_vertical_cover_image` - Imagem de Capa
- E mais 16 variáveis relacionadas a missões

### 🛤️ Trilha de Aprendizado (4 variáveis)
- `learning_trail_name` - Nome da Trilha
- `trail_name` - Nome da Trilha (alternativo)
- `learning_trail_link` - Link da Trilha
- `learning_trail_vertical_cover_image` - Imagem da Trilha

### 📊 Relatório (2 variáveis)
- `report_name` - Nome do Relatório
- `report_url` - URL do Relatório

### 📅 Datas e Prazos (3 variáveis)
- `enrollment_goal_date` - Data Limite de Inscrição
- `enrollment_created_date` - Data de Criação
- `days_to_expire` - Dias para Expirar

### 🔗 Links e URLs (3 variáveis)
- `app_web_link` - Link do App Web
- `konquest_web_url` - URL Konquest
- `konquest_certificate_web_url` - URL do Certificado

### 📌 Outras (7 variáveis)
- `days_remaining` - Dias Restantes
- `expired_days` - Dias Expirados
- `minimum_performance` - Performance Mínima
- `now_date`, `now_week_day`, `search_key`, `search_value`

## Como Usar

1. **Abra o Editor de Design System** (painel esquerdo)
2. **Expanda a seção de variáveis** que deseja editar (ex: "👤 Usuário")
3. **Edite os valores** dos campos
4. **Veja o preview** atualizado em tempo real no centro
5. **Exporte** sua configuração para reutilizar em outros templates

## Estratégias de Substituição

Como os templates estão compilados (HTML final), o sistema usa padrões inteligentes para substituir valores:

- **Nomes de pessoas** em maiúsculas são substituídos pelo nome configurado
- **URLs de logos** são detectados e substituídos
- **Nomes de missões/cursos** conhecidos são substituídos
- **Datas** no formato YYYY-MM-DD são atualizadas
- **Números** (dias, vagas) são substituídos onde fazem sentido

## Persistência

Todas as variáveis são salvas automaticamente no `localStorage` e podem ser exportadas/importadas via JSON.
