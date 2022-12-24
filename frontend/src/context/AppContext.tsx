import React, { useState } from "react";
import { createContextAndUse } from "../shared/context";

type AppContextType = {
  serverIsAvailable: boolean;
  setServerIsAvailable: (v: boolean) => void;
};

const [Context, useContext] = createContextAndUse<AppContextType>();

export const useAppContext = useContext;

export function AppProvider({ children }: { children: React.ReactElement }) {
  const [serverIsAvailable, setServerIsAvailable] = useState(false);

  return (
    <Context.Provider value={{ serverIsAvailable, setServerIsAvailable }}>
      {children}
    </Context.Provider>
  );
}
