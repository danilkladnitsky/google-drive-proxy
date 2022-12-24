import React, { useEffect, useState } from "react";
import { Spin, Result, Button, Progress } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";

import { getAuthLink } from "../api/api";

export const LoginPage = () => {
  const [fetchIsEnabled, setFetchIsEnabled] = useState(false);

  const { data, status } = useQuery("get-auth-link", getAuthLink, {
    enabled: fetchIsEnabled,
  });

  useEffect(() => {
    setTimeout(() => {
      setFetchIsEnabled(true);
    }, 3000);
  }, []);

  if (status === "loading" || status === "idle") {
    return (
      <Spin
        tip="Генерируем ссылку для авторизации в Google Drive..."
        indicator={<LoadingOutlined />}
        size="large"
      />
    );
  }

  if (typeof data === "string") {
    return (
      <Result
        status="success"
        title="Google Drive"
        subTitle="Ссылка сгенерирована успешно!"
        extra={
          <Button type="primary" onClick={() => (window.location.href = data)}>
            Авторизироваться
          </Button>
        }
      />
    );
  }

  return <div>LoginPage</div>;
};
