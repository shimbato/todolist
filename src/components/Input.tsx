import React, { ChangeEvent, KeyboardEvent } from "react";

type InputProps = {
  type: string;
  task?: boolean;
  title?: string;
  inputValue?: string;
  setInputValue: (inputValue: string) => void;
  callback?: () => void;
};
export const Input = ({
  inputValue,
  setInputValue,
  task,
  title,
  type,
  callback,
}: InputProps) => {
  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };
  const onKeyPressInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      callback?.();
    }
  };
  return (
    <>
      <input
        type={type}
        checked={task}
        value={inputValue}
        onChange={onChangeInputHandler}
        onKeyPress={onKeyPressInputHandler}
      />
      <span>{title}</span>
    </>
  );
};
