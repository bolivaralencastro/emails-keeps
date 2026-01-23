import { X } from 'lucide-react';
import './VariablesInfoDialog.css';

const variablesInfo = [
  {
    title: '👤 Dados de Usuário',
    count: 8,
    items: [
      { key: 'user_name', desc: 'Nome do usuário (ex: "João Silva")' },
      { key: 'user_email', desc: 'Email (ex: "joao.silva@exemplo.com")' },
      { key: 'user_login', desc: 'Login/usuário (ex: "joao.silva")' },
      { key: 'user_phone', desc: 'Telefone (ex: "(11) 98765-4321")' },
      { key: 'user_password', desc: 'Senha (usado para redefinição)' },
      { key: 'userId', desc: 'ID do usuário' },
      { key: 'userName', desc: 'Nome alternativo' },
      { key: 'user_id', desc: 'ID alternativo' },
    ]
  },
  {
    title: '🏢 Empresa/Workspace',
    count: 11,
    items: [
      { key: 'company', desc: 'Nome da empresa' },
      { key: 'workspace_name', desc: 'Nome do workspace' },
      { key: 'workspace_logo', desc: 'URL do logo do workspace' },
      { key: 'company_logo', desc: 'URL do logo da empresa' },
      { key: 'workspaceColor', desc: 'Cor primária' },
      { key: 'workspaceContrastColor', desc: 'Cor de contraste' },
      { key: 'workspaceId', desc: 'ID do workspace' },
      { key: 'workspace_icon', desc: 'Ícone do workspace' },
    ]
  },
  {
    title: '🎯 Missão/Curso',
    count: 23,
    items: [
      { key: 'mission_name', desc: 'Nome da missão/curso' },
      { key: 'mission_link', desc: 'Link/URL da missão' },
      { key: 'mission_start_date', desc: 'Data de início (ex: "2026-02-01")' },
      { key: 'mission_start_time', desc: 'Horário início (ex: "14:00")' },
      { key: 'mission_end_time', desc: 'Horário fim' },
      { key: 'mission_seats', desc: 'Vagas disponíveis (ex: "30")' },
      { key: 'mission_address', desc: 'Endereço completo' },
      { key: 'mission_location', desc: 'Local/sala' },
      { key: 'mission_vertical_cover_image', desc: 'Imagem de capa' },
      { key: 'mission_description', desc: 'Descrição da missão' },
      { key: 'mission_duration', desc: 'Duração' },
      { key: 'minimum_performance', desc: 'Performance mínima (%)' },
      { key: 'enrollment_status', desc: 'Status da matrícula' },
    ]
  },
  {
    title: '🛤️ Trilha de Aprendizado',
    count: 4,
    items: [
      { key: 'learning_trail_name', desc: 'Nome da trilha' },
      { key: 'trail_name', desc: 'Nome alternativo' },
      { key: 'learning_trail_link', desc: 'Link da trilha' },
      { key: 'learning_trail_vertical_cover_image', desc: 'Imagem da trilha' },
    ]
  },
  {
    title: '📊 Relatório',
    count: 2,
    items: [
      { key: 'report_name', desc: 'Nome do relatório' },
      { key: 'report_url', desc: 'URL do relatório' },
    ]
  },
  {
    title: '📅 Datas e Prazos',
    count: 7,
    items: [
      { key: 'enrollment_goal_date', desc: 'Data limite de inscrição' },
      { key: 'enrollment_created_date', desc: 'Data de criação' },
      { key: 'days_to_expire', desc: 'Dias para expirar' },
      { key: 'days_remaining', desc: 'Dias restantes' },
      { key: 'expired_days', desc: 'Dias expirados' },
      { key: 'now_date', desc: 'Data atual' },
      { key: 'now_week_day', desc: 'Dia da semana atual' },
    ]
  },
  {
    title: '🔗 Links e URLs',
    count: 3,
    items: [
      { key: 'app_web_link', desc: 'Link do app web' },
      { key: 'konquest_web_url', desc: 'URL da plataforma Konquest' },
      { key: 'konquest_certificate_web_url', desc: 'URL do certificado' },
    ]
  },
  {
    title: '📧 Suporte e Contato',
    count: 4,
    items: [
      { key: 'supportEmail', desc: 'Email de suporte' },
      { key: 'whatsappUrl', desc: 'Link do WhatsApp' },
      { key: 'companyName', desc: 'Nome da empresa (rodapé)' },
      { key: 'companyAddress', desc: 'Endereço da empresa (rodapé)' },
    ]
  },
  {
    title: '🔑 Acesso e Autenticação',
    count: 3,
    items: [
      { key: 'login_url', desc: 'URL de login' },
      { key: 'password_reset_url', desc: 'URL para redefinir senha' },
      { key: 'access_link', desc: 'Link de acesso direto (eventos live)' },
    ]
  }
];

export default function VariablesInfoDialog({ isOpen, onClose }) {
  if (!isOpen) return null;

  const totalVariables = variablesInfo.reduce((sum, cat) => sum + cat.count, 0);

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <div>
            <h2>📋 Propriedades Dinâmicas dos Templates</h2>
            <p className="dialog-subtitle">
              Variáveis disponíveis para customização dos emails
            </p>
          </div>
          <button className="dialog-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="dialog-stats">
          <div className="stat-item">
            <span className="stat-value">{totalVariables}</span>
            <span className="stat-label">Variáveis</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{variablesInfo.length}</span>
            <span className="stat-label">Categorias</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">27</span>
            <span className="stat-label">Templates</span>
          </div>
        </div>

        <div className="dialog-body">
          {variablesInfo.map((category, idx) => (
            <div key={idx} className="variable-category">
              <div className="category-header">
                <h3>{category.title}</h3>
                <span className="category-count">{category.count} variáveis</span>
              </div>
              <div className="variable-list">
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="variable-item">
                    <code className="variable-key">{item.key}</code>
                    <span className="variable-desc">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="dialog-footer">
          <p className="footer-note">
            💡 <strong>Nota:</strong> Essas variáveis são populadas pelo backend antes do envio dos emails. 
            No editor, você pode visualizar e testar diferentes valores através do painel de Design System.
          </p>
        </div>
      </div>
    </div>
  );
}
