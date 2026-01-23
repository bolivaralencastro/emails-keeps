export const templateCategories = [
  {
    id: 'analytics',
    name: '📊 Analytics',
    icon: '📊',
    templates: [
      'analytics_new_report'
    ]
  },
  {
    id: 'konquest_enrollment',
    name: '📝 Konquest - Matrículas',
    icon: '📝',
    templates: [
      'konquest_enrolled_in_group_missions',
      'konquest_user_enrolled_in_a_course',
      'konquest_user_enrolled_in_a_course_with_deadline',
      'konquest_user_enrolled_in_a_live_mission',
      'konquest_user_enrolled_in_a_presential_mission',
      'konquest_user_enrolled_in_a_trail',
      'konquest_live_enrollment_accepted',
      'konquest_presential_enrollment_accepted',
    ]
  },
  {
    id: 'konquest_expiration',
    name: '⏰ Konquest - Prazos e Expirações',
    icon: '⏰',
    templates: [
      'konquest_learning_trail_enrollment_expiring',
      'konquest_mission_enrollment_expired',
      'konquest_mission_enrollment_expiring',
      'konquest_mission_enrollment_restarted',
    ]
  },
  {
    id: 'konquest_events',
    name: '📅 Konquest - Eventos',
    icon: '📅',
    templates: [
      'konquest_live_mission_starts_soon',
      'konquest_presential_mission_starts_soon',
    ]
  },
  {
    id: 'konquest_management',
    name: '⚙️ Konquest - Gestão',
    icon: '⚙️',
    templates: [
      'konquest_new_enrollment_to_review',
      'konquest_new_mission_to_manage',
      'konquest_mission_modified_by_contributor',
      'konquest_mission_minimum_performance_updated',
      'konquest_mission_trail_disabled',
    ]
  },
  {
    id: 'konquest_general',
    name: '🎯 Konquest - Geral',
    icon: '🎯',
    templates: [
      'konquest_invite',
      'konquest_onboarding',
      'konquest_new_missions',
    ]
  },
  {
    id: 'smartzap',
    name: '💬 SmartZap',
    icon: '💬',
    templates: [
      'smartzap_invite',
      'smartzap_caixa_user_already_enrolled_error',
      'smartzap_caixa_user_not_found_error',
    ]
  },
  {
    id: 'myaccount',
    name: '👤 MyAccount',
    icon: '👤',
    templates: [
      'myaccount_resend_invite'
    ]
  }
];

// Flatten all templates for backward compatibility
export const templateList = templateCategories.flatMap(cat => cat.templates);

export const getTemplateName = (template) => {
  return template
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const getCategoryForTemplate = (template) => {
  return templateCategories.find(cat => cat.templates.includes(template));
};
