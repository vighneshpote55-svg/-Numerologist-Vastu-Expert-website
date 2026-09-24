type AnalyticsEvent =
  | 'consultation_cta_click'
  | 'whatsapp_click'
  | 'phone_click'
  | 'form_start'
  | 'form_submission'
  | 'number_selected'
  | 'vastu_zone_inspected'
  | 'service_viewed'
  | 'calculator_book_click'
  | 'package_select'
  | 'case_study_select'
  | 'tool_tab_switch'
  | 'mahavastu_zone_select'
  | 'media_item_click'
  | 'theme_toggle'
  | 'proof_tab_switch'
  | 'service_tab_switch'
  | 'mahavastu_tab_switch';

interface EventPayload {
  [key: string]: string | number | boolean | undefined;
}

export function trackEvent(eventName: AnalyticsEvent, payload?: EventPayload): void {
  try {
    const entry = {
      event: eventName,
      timestamp: new Date().toISOString(),
      payload: payload || {},
      path: window.location.pathname
    };

    // Keep lightweight log in session storage for local auditing
    const existingRaw = sessionStorage.getItem('analytics_events');
    const existing = existingRaw ? JSON.parse(existingRaw) : [];
    sessionStorage.setItem('analytics_events', JSON.stringify([...existing.slice(-40), entry]));

    // Dispatch custom browser event for integrations
    window.dispatchEvent(new CustomEvent('app_analytics', { detail: entry }));
  } catch (err) {
    // Fail silently without disrupting user UX
  }
}
