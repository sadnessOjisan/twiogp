import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

import { GA_TRACKING_ID } from "../util/ga";

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head>
          {GA_TRACKING_ID && (
            <>
              <Script
                defer
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                strategy="afterInteractive"
              />
              <Script
                defer
                dangerouslySetInnerHTML={{
                  __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());    
              gtag('config', '${GA_TRACKING_ID}');
            `,
                }}
                strategy="afterInteractive"
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
