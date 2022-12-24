import { Button, Card, Popover } from "antd";
import Meta from "antd/es/card/Meta";
import React, { FC } from "react";
import { FileIcon } from "react-file-icon";
import { Navigate } from "react-router";

type Props = {
  id: string;
  name: string;
  mimeType: string;
  className: string;
  isFolder?: boolean;
  share: (id: string) => void;
  isShared?: boolean;
  downloads?: number;
  link?: string;
};

export const File: FC<Props> = ({
  name,
  id,
  mimeType,
  className,
  isFolder,
  share,
  isShared,
  downloads,
  link,
}) => {
  return (
    <Card className={className}>
      <Meta
        avatar={getFileIcon(mimeType, isFolder || false)}
        title={name}
        description={
          !isShared ? (
            <>
              <Button type="primary" onClick={() => share(id)}>
                Расшарить
              </Button>
            </>
          ) : (
            <Popover
              content={<Button type="link" href={link} children={link} />}
              title="Ссылка на файл"
            >
              <Button type="primary">Получить ссылку</Button>
            </Popover>
          )
        }
      />
    </Card>
  );
};

const getFileIcon = (extension: string, isFolder: boolean) => {
  if (isFolder) {
    return <FileIcon extension="folder" />;
  }
  if (extension.includes("image")) {
    const ext = extension.split("image/")[1];
    return <FileIcon extension={ext} type="image" />;
  }

  if (extension.includes("application/vnd.google-apps.document")) {
    return <FileIcon extension={"doc"} type="document" />;
  }

  if (extension.includes("spreadsheet")) {
    return <FileIcon extension={"xls"} type="spreadsheet" />;
  }
  return <FileIcon type="binary" />;
};
