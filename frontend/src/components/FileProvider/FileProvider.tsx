import { FC } from "react";
import { FileProviderProps } from ".";
import styles from "./FileProvider.module.css";

export const FileProvider: FC<FileProviderProps> = (props) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Folder</p>
      <div className={styles.content}></div>
    </div>
  );
};
