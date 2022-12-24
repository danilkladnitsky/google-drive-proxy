import React, { FC, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { pingServer } from "../api/api";

import { Spin, Result, Button, Progress } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import styles from "./style.module.scss";
import { MAX_RETRY_ATTEMPTS } from "../shared/api";
import { useAppContext } from "../context/AppContext";

type Props = {
  children: React.ReactElement;
};

export const ServerGuard: FC<Props> = ({ children }) => {
  const { serverIsAvailable, setServerIsAvailable } = useAppContext();
  const [fetchEnabled, setFetchEnabled] = useState(false);

  const { data, status, refetch, failureCount } = useQuery("ping", pingServer, {
    retry: MAX_RETRY_ATTEMPTS,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    enabled: fetchEnabled,
  });

  useEffect(() => {
    setTimeout(() => setFetchEnabled(true), 1500);
  }, []);

  const ResponseComponent = useMemo(() => {
    if (!fetchEnabled) {
      return (
        <Spin
          indicator={<LoadingOutlined />}
          size="large"
          tip={"Инициализируем соединение..."}
        />
      );
    }

    if (status === "loading" || status === "idle") {
      return (
        <Spin
          indicator={<LoadingOutlined />}
          size="large"
          tip={
            <div>
              Подключаемся к серверу...<br></br>
              Попытка {failureCount}/{MAX_RETRY_ATTEMPTS}
              <Progress
                percent={(failureCount * 100) / MAX_RETRY_ATTEMPTS}
                size="small"
                status="exception"
              />
            </div>
          }
        />
      );
    }

    if (serverIsAvailable || (status === "success" && data)) {
      setServerIsAvailable(true);
      return children;
    }

    return (
      <Result
        status="error"
        title="500"
        subTitle="Сервер не отвечает..."
        extra={
          <Button type="primary" onClick={() => refetch()}>
            Попробовать подключиться снова
          </Button>
        }
      />
    );
  }, [status, data, failureCount, serverIsAvailable]);

  return <div className={styles.wrapper}>{ResponseComponent}</div>;
};
