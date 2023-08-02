import React from "react";
interface AvatarProps {
    src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
    return (
        <img
            className="rounded-full"
            height="30"
            width="30"
            alt="Avatar"
            src={src || '../assets/images/placeholder.jpg'}
        />
    );
}

export default Avatar;