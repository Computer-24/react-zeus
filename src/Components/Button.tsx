import React from 'react';
import Spinner from "./Spinner";

type ButtonProps = {
    text?: string,
    className?: string,
    secondary?: boolean,
    onClick?: () => void,
    loading?: boolean,
}
const Button = ({
                    text = "Button",
                    secondary,
                    className,
                    onClick,
                    loading = false,
                }: ButtonProps) => {
    return (
        <button
            className={`py-2 px-9 flex justify-center gap-3 items-center rounded-full text-white border-2 border-white hover:bg-myPink transition-all hover:drop-shadow-lg ${secondary ? "bg-myPink" : "bg-myBlue"} ${className} ${loading && "cursor-wait"}`}
            onClick={onClick} disabled={loading}>
            {loading && <Spinner/>}
            {text}
        </button>
    );
};

export default Button;