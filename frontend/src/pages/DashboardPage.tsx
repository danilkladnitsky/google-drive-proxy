import { Button, QRCode, Result } from "antd";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  getFiles,
  getLinks,
  getSharedFiles,
  REQUESTS,
  _fetch,
} from "../api/api";
import { File } from "../components/File";
import { SpinLoader } from "../components/Spin";
import styles from "./DashboardPage.module.scss";

export const DashboardPage = () => {
  const {
    data: files,
    status: fileListStatus,
    refetch: refetchFileList,
  } = useQuery("get-files", () => getFiles(), {
    refetchOnWindowFocus: false,
  });

  const {
    data: sharedFiles,
    status: sharedFileListStatus,
    refetch: refetchSharedFiles,
  } = useQuery("get-shared-files", () => getSharedFiles(), {
    refetchOnWindowFocus: false,
  });

  const {
    data: links,
    status: linksStatus,
    refetch: refetchLinks,
  } = useQuery("get-shared-links", () => getLinks(), {
    refetchOnWindowFocus: false,
  });

  const [sharedLinkIsVisible, setSharedLinkIsVisible] = useState(false);

  const {
    mutate: shareFile,
    data: sharedLink,
    isLoading: fileIsSharing,
    error: shareError,
  } = useMutation({
    mutationFn: (id: string) => {
      return _fetch<{ link: string }>(
        REQUESTS.STORAGE.SHARE_FILE + `/${id}`,
        "POST"
      );
    },
  });

  useEffect(() => {
    if (!sharedLink) {
      return;
    }
    setSharedLinkIsVisible(true);

    refetchFileList();
    refetchLinks();
    refetchSharedFiles();

    setTimeout(() => setSharedLinkIsVisible(false), 5000);
  }, [sharedLink]);

  if (sharedLinkIsVisible) {
    return (
      <Result
        status="success"
        title="Ссылка была успешна расшарена!"
        subTitle={`Теперь вы можете ссылку ${sharedLink?.link} скопировать и отправить кому хотите.`}
        extra={
          <div className={styles.qr}>
            <QRCode value={sharedLink?.link as string} />
            <Button
              type="primary"
              onClick={() => setSharedLinkIsVisible(false)}
            >
              Закрыть
            </Button>
          </div>
        }
      />
    );
  }

  if (fileListStatus === "loading" || sharedFileListStatus === "loading") {
    return <SpinLoader title="Загружаем файлы..." />;
  }

  if (fileIsSharing) {
    return <SpinLoader title="Шэйрим файл..." />;
  }

  return (
    <div className={styles.list}>
      <h2>Мои файлы</h2>

      <div className={styles.files}>
        {files?.map((file) => {
          const sharedFile = sharedFiles?.find((f) => f.driveId === file.id);

          const link = links?.find((link) => link.id === sharedFile?.id);

          return (
            <File
              {...file}
              key={file.id}
              className={styles.file}
              share={shareFile}
              isShared={!!sharedFile}
              downloads={sharedFile?.downloads}
              link={link?.link}
            />
          );
        })}
      </div>
    </div>
  );
};
