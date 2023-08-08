import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {AppUser} from "../types/AppUser";
import useFavorite from "../hooks/useFavourite";
import React from "react";

interface HeartButtonProps {
    listingId: string
    currentUser?: AppUser | null
}

const HeartButton: React.FC<HeartButtonProps> = ({listingId, currentUser
}) => {
    const { hasFavourite, toggleFavorite } = useFavorite({
        listingId,
        currentUser
    });

    return (
        <div
            onClick={toggleFavorite}
            className="
                    relative
                    hover:opacity-80
                    transition
                    cursor-pointer
            "
        >
            <AiOutlineHeart
                size={28}
                className="
                    fill-white
                    absolute
                    -top-[2px]
                    -right-[2px]
                "
            />
            <AiFillHeart
                size={24}
                className={
                    hasFavourite ? 'fill-rose-500' : 'fill-neutral-500/70'
                }
            />
        </div>
    );
}

export default HeartButton;