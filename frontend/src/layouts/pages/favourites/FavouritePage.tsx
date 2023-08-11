
import {useUser} from "../../../hooks/useUser";
import {useEffect, useState} from "react";
import {Listing} from "../../../types/Listing";
import getListingById from "../../../actions/getListingById";
import EmptyState from "../../../components/EmptyState";
import FavoritesClient from "./FavouriteClient";
import getUserFavouriteListings from "../../../actions/getUserFavouriteListings";

const ListingPage = () => {
    const userContext = useUser();
    const [listings, setListings] = useState<Listing[] | undefined>(undefined);

    useEffect(() => {
        const id = window.location.pathname.split('/').pop();
        const fetchListing = async () => {
            const list = await getUserFavouriteListings();
            setListings(list);
        };
        fetchListing();
    }, []);

    if (!listings) {
        return (
           <></>
        );
    }

    return (
        <FavoritesClient
            listings={listings}
            currentUser={userContext.user}
        />

    );
}

export default ListingPage;