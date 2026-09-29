const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const initializeAnalytics = () => {
  if (!GA_MEASUREMENT_ID) {
    console.warn("Google Analytics Measurement ID is missing.");
    return;
  }

  if (window.gtag) {
    return;
  }

  const script = document.createElement("script");

  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;

  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];

  window.gtag = function () {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());

  window.gtag("config", GA_MEASUREMENT_ID);
};

export const trackPageView = (url) => {
  if (!window.gtag || !GA_MEASUREMENT_ID) {
    return;
  }

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

export const trackEvent = (eventName, parameters = {}) => {
  if (!window.gtag) {
    return;
  }

  window.gtag("event", eventName, parameters);
};