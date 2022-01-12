import Script from "next/script";
import { VFC } from "react";

import { GA_TRACKING_ID } from "../util/ga";

export const GA: VFC = () => {
  return GA_TRACKING_ID ? (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
        defer
      />
      <Script id="google-analytics" strategy="afterInteractive" defer>
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);};
              gtag('js', new Date());
              gtag('config', "${GA_TRACKING_ID}");
            `}
      </Script>
    </>
  ) : (
    <></>
  );
};
