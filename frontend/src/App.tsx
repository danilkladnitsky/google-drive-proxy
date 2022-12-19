import React from "react";
import { FileProvider } from "./components/FileProvider";
import { Menu } from "./components/Menu";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.app}>
      <Menu />
      <FileProvider />
    </div>
  );
}

export default App;
