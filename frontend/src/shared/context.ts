import React, { useContext } from "react";

export function createContextAndUse<IS>(): [React.Context<IS | any>, () => IS] {
  const Context = React.createContext<IS | any>(null);
  return [Context, (): IS => useContext<IS>(Context)];
}

export type ContextProps = {
  children:
    | boolean
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
};
