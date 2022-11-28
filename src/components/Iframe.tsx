import React from "react";
import { TARGET_ID } from "../constants";

type Props = {
  url: string;
  height?: number | string | undefined;
  width?: number | string | undefined;
};

export const Iframe = ({
  url,
  height = 450,
  width = 450,
}: Props): JSX.Element => (
  <iframe id={TARGET_ID} src={url} width={width} height={height} />
);
