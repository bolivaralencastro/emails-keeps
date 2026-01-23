// Definição de todas as variáveis encontradas nos templates
import { User, Building2, Target, Route, FileText, Calendar, Link2 } from 'lucide-react';

export const templateVariables = {
  user: {
    label: 'Usuário',
    icon: '👤',
    lucideIcon: User,
    fields: [
      { key: 'user_name', label: 'Nome do Usuário', default: 'João Silva' },
      { key: 'user_email', label: 'Email do Usuário', default: 'joao.silva@exemplo.com' },
      { key: 'user_login', label: 'Login do Usuário', default: 'joao.silva' },
      { key: 'user_phone', label: 'Telefone do Usuário', default: '(11) 98765-4321' },
    ]
  },
  
  workspace: {
    label: 'Empresa/Workspace',
    icon: '🏢',
    lucideIcon: Building2,
    fields: [
      { key: 'company', label: 'Nome da Empresa', default: 'Minha Empresa' },
      { key: 'workspace_name', label: 'Nome do Workspace', default: 'Workspace Principal' },
      { key: 'workspace_logo', label: 'URL do Logo', default: '', type: 'url' },
      { key: 'company_logo', label: 'URL do Logo da Empresa', default: '', type: 'url' },
    ]
  },
  
  mission: {
    label: 'Missão/Curso',
    icon: '🎯',
    lucideIcon: Target,
    fields: [
      { key: 'mission_name', label: 'Nome da Missão', default: 'Treinamento de Vendas' },
      { key: 'mission_link', label: 'Link da Missão', default: '#', type: 'url' },
      { key: 'mission_start_date', label: 'Data de Início', default: '2026-02-01' },
      { key: 'mission_start_time', label: 'Horário de Início', default: '14:00' },
      { key: 'mission_seats', label: 'Vagas Disponíveis', default: '30' },
      { key: 'mission_address', label: 'Endereço', default: 'Rua Exemplo, 123' },
      { key: 'mission_vertical_cover_image', label: 'Imagem de Capa', default: '', type: 'url' },
    ]
  },
  
  trail: {
    label: 'Trilha de Aprendizado',
    icon: '🛤️',
    lucideIcon: Route,
    fields: [
      { key: 'learning_trail_name', label: 'Nome da Trilha', default: 'Trilha de Liderança' },
      { key: 'trail_name', label: 'Nome da Trilha (alt)', default: 'Trilha de Liderança' },
      { key: 'learning_trail_link', label: 'Link da Trilha', default: '#', type: 'url' },
      { key: 'learning_trail_vertical_cover_image', label: 'Imagem da Trilha', default: '', type: 'url' },
    ]
  },
  
  report: {
    label: 'Relatório',
    icon: '📊',
    lucideIcon: FileText,
    fields: [
      { key: 'report_name', label: 'Nome do Relatório', default: 'Relatório Mensal' },
      { key: 'report_url', label: 'URL do Relatório', default: '#', type: 'url' },
    ]
  },
  
  dates: {
    label: 'Datas e Prazos',
    icon: '📅',
    lucideIcon: Calendar,
    fields: [
      { key: 'enrollment_goal_date', label: 'Data Limite de Inscrição', default: '2026-03-01' },
      { key: 'enrollment_created_date', label: 'Data de Criação', default: '2026-01-22' },
      { key: 'days_to_expire', label: 'Dias para Expirar', default: '7' },
      { key: 'days_remaining', label: 'Dias Restantes', default: '5' },
    ]
  },
  
  links: {
    label: 'Links e URLs',
    icon: '🔗',
    lucideIcon: Link2,
    fields: [
      { key: 'app_web_link', label: 'Link do App Web', default: 'https://app.exemplo.com', type: 'url' },
      { key: 'konquest_web_url', label: 'URL Konquest', default: 'https://konquest.exemplo.com', type: 'url' },
      { key: 'konquest_certificate_web_url', label: 'URL Certificado', default: '#', type: 'url' },
    ]
  }
};

export const getDefaultVariables = () => {
  const defaults = {};
  
  Object.values(templateVariables).forEach(category => {
    category.fields.forEach(field => {
      defaults[field.key] = field.default;
    });
  });
  
  return defaults;
};
