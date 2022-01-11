export const GA_TRACKING_ID = "G-1MCMZCSVVM";

export const pageview = (url: string): void => {
  if (!GA_TRACKING_ID) return;
  //   eslint-disable-next-line
  //   @ts-ignore
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};
