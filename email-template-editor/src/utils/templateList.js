export const templateList = [
  'analytics_new_report',
  'konquest_enrolled_in_group_missions',
  'konquest_invite',
  'konquest_learning_trail_enrollment_expiring',
  'konquest_live_enrollment_accepted',
  'konquest_live_mission_starts_soon',
  'konquest_mission_enrollment_expired',
  'konquest_mission_enrollment_expiring',
  'konquest_mission_enrollment_restarted',
  'konquest_mission_minimum_performance_updated',
  'konquest_mission_modified_by_contributor',
  'konquest_mission_trail_disabled',
  'konquest_new_enrollment_to_review',
  'konquest_new_missions',
  'konquest_new_mission_to_manage',
  'konquest_onboarding',
  'konquest_presential_enrollment_accepted',
  'konquest_presential_mission_starts_soon',
  'konquest_user_enrolled_in_a_course',
  'konquest_user_enrolled_in_a_course_with_deadline',
  'konquest_user_enrolled_in_a_live_mission',
  'konquest_user_enrolled_in_a_presential_mission',
  'konquest_user_enrolled_in_a_trail',
  'myaccount_resend_invite',
  'smartzap_caixa_user_already_enrolled_error',
  'smartzap_caixa_user_not_found_error',
  'smartzap_invite'
];

export const getTemplateName = (template) => {
  return template
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
