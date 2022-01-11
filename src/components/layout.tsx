import Link from "next/link";
import { FC } from "react";

import styles from "./layout.module.scss";

export const Layout: FC = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Link href="/">
          <h1>twiogp</h1>
        </Link>
      </header>
      {children}
    </div>
  );
};
