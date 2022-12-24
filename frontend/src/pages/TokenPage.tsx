import React from "react";
import { useQuery } from "react-query";
import { getUserEntity } from "../api/api";

export const TokenPage = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  const { data, status } = useQuery(
    "get-auth-token",
    () => getUserEntity(params.code),
    { retry: false, refetchOnWindowFocus: false }
  );

  console.log(data, status);

  return <div>{params.code}</div>;
};
