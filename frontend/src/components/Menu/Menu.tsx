import { FC } from "react";
import styles from "./Menu.module.css";

export const Menu: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logoWrapper}>
        <img src="/logo.png" alt="logo" className={styles.logo} />
        <p>Drive</p>
      </div>
      <div className={styles.profile}>
        <div className={styles.pic}></div>
      </div>
    </div>
  );
};
