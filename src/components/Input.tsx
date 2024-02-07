import React, { ChangeEvent, KeyboardEvent } from "react";

type InputProps = {
  type: string;
  task?: boolean;
  title?: string;
  inputValue?: string;
  setInputValue: (inputValue: string) => void;
  callback?: () => void;
  className?: string;
  onKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void;
  checked?: boolean;
  setError?: any; // how to fix?
};
export const Input = ({
  inputValue,
  setInputValue,
  task,
  title,
  type,
  callback,
  onKeyPress,
  className,
  setError,
}: InputProps) => {
  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
    // if (onChange) {
    //   onChange(event);
    // }
  };
  const onKeyPressInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
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
        className={className}
        onKeyPress={onKeyPressInputHandler}
      />
      <span>{title}</span>
    </>
  );
};
