import { FC } from "react";
import { MenuItemProps } from ".";
import styles from "./MenuItem.module.css";

export const MenuItem: FC<MenuItemProps> = ({ icon, text }) => {
  return (
    <div className={styles.wrapper}>
      {icon}
      {text}
    </div>
  );
};
