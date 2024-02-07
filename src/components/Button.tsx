import React from "react";

type ButtonType = {
  name: string;
  callback: () => void;
  className?: string;
};
export const Button = ({ name, callback, className }: ButtonType) => {
  const onCLickHandler = () => {
    callback?.();
  };
  return (
    <button onClick={onCLickHandler} className={className}>
      {name}
    </button>
  );
};
