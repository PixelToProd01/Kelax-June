import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../analytics.js";

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname + location.search;

    trackPageView(currentPath);
  }, [location]);

  return null;
};

export default AnalyticsTracker;