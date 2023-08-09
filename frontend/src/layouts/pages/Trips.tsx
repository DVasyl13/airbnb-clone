import React, {useEffect, useState} from 'react';
import EmptyState from "../../components/EmptyState";
import TripsClient from "./TripsClient";
import getReservationsByUser from "../../actions/getReservationsByUser";
import {useUser} from "../../hooks/useUser";
import {Reservation} from "../../types/Reservation";

const TripsPage = () => {
    const userContext = useUser();
    const [reservations, setReservations] = useState<Reservation[] | undefined>(undefined);

    useEffect(() => {
        const fetchReservations = async () => {
            const res = await getReservationsByUser()
            setReservations(res);
        };
        fetchReservations();
    }, []);

    if (!reservations) {
        return (
            <EmptyState
                title="No trips found"
                subtitle="Looks like you haven`t reserved any trips."
            />
        );
    }
    return (
        <TripsClient
            reservations={reservations}
            currentUser={userContext.user}
        />
    );
}

export default TripsPage;