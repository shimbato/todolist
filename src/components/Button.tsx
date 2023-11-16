import React from 'react';

type ButtonType = {
    name?: string
    callback: () => void
}
export const Button = ({name, callback}: ButtonType) => {

    const onCLickHandler = () => {
        callback()
    }
    return (
        <button onClick={() => onCLickHandler()}>
            {name}
        </button>
    );
};

