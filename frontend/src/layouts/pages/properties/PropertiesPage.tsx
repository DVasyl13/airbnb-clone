import {useUser} from "../../../hooks/useUser";
import PropertiesClient from "./PropertiesClient";
import {useEffect, useState} from "react";
import {Listing} from "../../../types/Listing";
import getUserListings from "../../../actions/getUserListings";

const PropertiesPage = () => {
    const userContext = useUser();
    const [listings, setListings] = useState<Listing[] | undefined>(undefined);

    useEffect(() => {
        const id = window.location.pathname.split('/').pop();
        const fetchListing = async () => {
            const list = await getUserListings();
            setListings(list);
        };
        fetchListing();
    }, []);

    if (!listings) {
        return (
            <></>
        );
    }

    const removeListings = (id: string) => {
        const indexToRemove = listings.findIndex(listings => listings.id === id);
        if (indexToRemove !== -1) {
            const updatedListings = [
                ...listings.slice(0, indexToRemove),
                ...listings.slice(indexToRemove + 1)
            ];
            setListings(updatedListings);
        }
    };

    return (
            <PropertiesClient
                listings={listings}
                currentUser={userContext.user}
                removeListings={removeListings}
            />
    );
}

export default PropertiesPage;