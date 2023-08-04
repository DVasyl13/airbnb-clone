import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useLoginModal from "./useLoginModal";
import {AppUser} from "../types/AppUser";
import {useNavigate} from "react-router-dom";

interface IUseFavorite {
    listingId: string;
    currentUser?: AppUser | null
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
    const navigator = useNavigate();

    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(listingId);
    }, [currentUser, listingId]);

    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();

            if (!currentUser) {
                return loginModal.onOpen();
            }

            try {
                let request;

                if (hasFavorited) {
                    request = () => {};
                        // axios.delete(`/api/favorites/${listingId}`);
                } else {
                    request = () => {};
                        // axios.post(`/api/favorites/${listingId}`);
                }

                await request();
                navigator(0)
                toast.success('Success');
            } catch (error) {
                toast.error('Something went wrong.');
            }
        },
        [
            currentUser,
            hasFavorited,
            listingId,
            loginModal,
            navigator
        ]);

    return {
        hasFavorited,
        toggleFavorite,
    }
}

export default useFavorite;