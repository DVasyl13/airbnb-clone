import React from "react";
interface AvatarProps {
    src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
    const imagePath = require('../assets/images/placeholder.jpg');
    return (
        <img
            className="rounded-full"
            height="30"
            width="30"
            alt="Avatar"
            src={src || imagePath}
        />
    );
}

export default Avatar;