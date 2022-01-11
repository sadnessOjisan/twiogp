import type { AppProps } from "next/app";

import __ from "../styles/normalaize.css";
import _ from "../styles/reset.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${_.content} ${__.content}`}>
      <Component {...pageProps} />;
    </div>
  );
}

export default MyApp;
