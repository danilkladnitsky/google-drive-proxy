import React, { FC } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

type Props = {
  title: string;
};
export const SpinLoader: FC<Props> = ({ title = "Загрузка..." }) => {
  return <Spin indicator={<LoadingOutlined />} size="large" tip={title} />;
};
