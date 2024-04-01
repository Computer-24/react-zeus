import React from 'react';
import {IconType} from "react-icons";

type IconProps = {
    IconName: IconType,
    className?: string,
    loading?: boolean,
    onClick?: () => void,
    ping?: boolean,
    reduceOpacityOnHover?: boolean,
    size?: number,
}
const Icon = ({
                  IconName,
                  className,
                  loading,
                  onClick,
                  ping,
                  reduceOpacityOnHover,
                  size = 20,
              }: IconProps) => {
    return (
        <button onClick={onClick} disabled={loading}
                className={`relative p-3 rounded-full cursor-pointer hover:bg-myBlue ${reduceOpacityOnHover ?
                    "hover:bg-opacity-30" : "bg-myBlue text-white border-2 border-white hover:drop-shadow-lg"} 
                    ${loading && "cursor-wait"} ${className}`}>
            {loading ? "Loading" : <IconName size={size}/>}
            {ping && (
                <>
                 <span className="absolute -top-1 left-7 w-3 h-3 border-2 border-gray-800 rounded-full bg-myPink"/>
                 <span className="animate-ping absolute -top-1 left-7 w-3 h-3 border-2 border-gray-800 rounded-full bg-myPink"/>
                </>
            )}
        </button>
    );
};

export default Icon;