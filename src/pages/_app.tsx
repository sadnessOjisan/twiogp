import type { AppProps } from "next/app";

import { Layout } from "../components/layout";
import __ from "../styles/normalize.css";
import _ from "../styles/reset.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${_.content} ${__.content}`}>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </div>
  );
}

export default MyApp;
