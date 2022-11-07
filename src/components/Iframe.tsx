import React from "react";
import { IFRAME_ID } from "../constants";

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
  <iframe id={IFRAME_ID} src={url} width={width} height={height} />
);
