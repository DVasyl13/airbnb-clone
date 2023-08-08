import React, {useCallback, useMemo, useState} from "react";
import {toast} from "react-hot-toast";

import useLoginModal from "./useLoginModal";
import {AppUser} from "../types/AppUser";
import {useNavigate} from "react-router-dom";
import deleteListingFromFavourite from "../api/deleteListingFromFavourite";
import addListingFromFavourite from "../api/addListingFromFavourite";

interface IUseFavorite {
    listingId: string;
    currentUser?: AppUser | null
}

const useFavorite = ({listingId, currentUser}: IUseFavorite) => {
    const loginModal = useLoginModal();

    const [hasFavourite, setHasFavourite] = useState(
        currentUser?.favoriteIds.includes(listingId) || false
    );

    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();

            if (!currentUser) {
                return loginModal.onOpen();
            }

            try {
                if (hasFavourite) {
                    await deleteListingFromFavourite(listingId);
                    const indexToRemove = currentUser.favoriteIds.indexOf(listingId);
                    if (indexToRemove !== -1) {
                        currentUser.favoriteIds.splice(indexToRemove, 1);
                    }
                } else {
                    await addListingFromFavourite(listingId);
                    currentUser.favoriteIds.push(listingId);
                }
                setHasFavourite((prevHasFavorited) => !prevHasFavorited);
            } catch (error) {
                toast.error("Something went wrong.");
            }
        },
        [currentUser, hasFavourite, listingId, loginModal]
    );

    return {
        hasFavourite,
        toggleFavorite,
    };
}

export default useFavorite;