import React, {useEffect, useState} from 'react';
import getListingById from "../../actions/getListingById";
import {useUser} from "../../hooks/useUser";
import EmptyState from "../../components/EmptyState";
import ListingClient from "./ListingClient";
import {Listing} from "../../types/Listing";
import {Reservation} from "../../types/Reservation";
import getReservations from "../../actions/getReservations";

const ListingPage = () => {
    const userContext = useUser();
    const [listing, setListing] = useState<Listing | undefined>(undefined);
    const [reservation, setReservation] = useState<Reservation[] | undefined>(undefined);

    useEffect(() => {
        const id = window.location.pathname.split('/').pop();
        const fetchListing = async () => {
            const list = await getListingById(id);
            setListing(list);
        };
        fetchListing();
    }, []);

    useEffect(() => {
        const id = window.location.pathname.split('/').pop();
        const fetchReservations = async () => {
            const res = await getReservations(id)
            setReservation(res);
        };
        fetchReservations();
    }, []);

    if (!listing) {
        return (
            <EmptyState/>
        );
    }

    return (
        <ListingClient
            listing={listing}
            reservations={reservation}
            currentUser={userContext.user}
        />
    );
}
export default ListingPage;