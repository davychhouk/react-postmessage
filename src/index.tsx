import React from "react";

type Props = {
  name: string;
};

export const Test = ({ name }: Props): JSX.Element => (
  <div>Welcome to {name}!</div>
);
