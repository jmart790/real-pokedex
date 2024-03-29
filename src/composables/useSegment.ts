import { AnalyticsBrowser } from '@segment/analytics-next';

const analytics = AnalyticsBrowser.load({
  writeKey: 'XMijBqykYo11CA0JErsLUKbk2eqffrYF'
});

function deviceMatch(userAgent: string) {
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|iOS/i;
  const tabletRegex = /Tablet|iPad/i;
  const laptopRegex = /Windows NT|Macintosh/;
  const isMobile = mobileRegex.test(userAgent);
  const isTablet = !isMobile && tabletRegex.test(userAgent);
  const isLaptop = !isMobile && !isTablet && laptopRegex.test(userAgent);
  return isMobile ? 'mobile' : isTablet ? 'tablet' : isLaptop ? 'laptop' : 'desktop';
}

function getDeviceInfo(userAgent: string) {
  const deviceType = deviceMatch(userAgent);

  // Match the browser type using a regular expression
  const browserMatch = userAgent.match(/(Chrome|Safari|Firefox|Edge|IE|Opera)/);
  const browserType = browserMatch ? browserMatch[0] : 'unknown';

  return { deviceType, browserType };
}

export default function useAnalytics() {
  function trackPageView() {
    analytics.page();
  }

  function trackEvent(eventName, properties) {
    analytics.track(eventName, properties);
  }

  function trackNewUser({ navigator, screen }: Window) {
    // temp solution
    const isProd = import.meta.env.PROD;
    if (!isProd) return;

    const { deviceType, browserType } = getDeviceInfo(navigator.userAgent);
    const eventName = 'New User';
    const payload = {
      device_type: deviceType,
      browser_type: browserType,
      screen_width: `${screen.width}px`,
      screen_height: `${screen.height}px`,
      user_agent: navigator.userAgent
    };
    analytics.track(eventName, payload);
  }

  return {
    trackPageView,
    trackEvent,
    trackNewUser
  };
}
