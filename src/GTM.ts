import TagManager from "react-gtm-module";

const GTM_ID = "GTM-W594H63"; // Replace with your GTM container ID.

export const initializeGTM = () => {
  const tagManagerArgs = {
    gtmId: GTM_ID,
  };

  TagManager.initialize(tagManagerArgs);
};