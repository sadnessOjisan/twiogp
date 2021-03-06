import "../styles/reset.css";
import "../styles/normalize.css";

import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { GA } from "../components/ga";
import { Layout } from "../components/layout";
import { GA_TRACKING_ID, pageview } from "../util/ga";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    if (!GA_TRACKING_ID) return;

    const handleRouteChange = (url: string) => {
      pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <Layout>
      <GA />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
