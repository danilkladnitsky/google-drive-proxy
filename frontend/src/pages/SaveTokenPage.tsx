import React from "react";
import { Navigate } from "react-router";

export const SaveTokenPage = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  localStorage.setItem("id", params.id);

  return <Navigate to={"/"} />;
};
