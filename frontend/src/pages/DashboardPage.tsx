import React from "react";
import { FileProvider } from "../components/FileProvider";
import { Menu } from "../components/Menu";

export const DashboardPage = () => {
  return (
    <div>
      <Menu />
      <FileProvider />
    </div>
  );
};
