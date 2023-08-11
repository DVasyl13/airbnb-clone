import React, {useEffect, useState} from 'react';
import {useUser} from "../../../hooks/useUser";
import TripsClient from "./ReservationsClient";
import {Reservation} from "../../../types/Reservation";
import getReservationsByUserListings from "../../../actions/getReservationsByUserListings";

const ReservationsPage = () => {
    const userContext = useUser();
    const [reservations, setReservations] = useState<Reservation[] | undefined>(undefined);

    useEffect(() => {
        const fetchReservations = async () => {
            const res = await getReservationsByUserListings()
            setReservations(res);
        };
        fetchReservations();
    }, []);


    if (!reservations) {
        return (
            <></>
        );
    }

    const removeReservation = (id: string) => {
        const indexToRemove = reservations.findIndex(reservation => reservation.id === id);
        if (indexToRemove !== -1) {
            const updatedReservations = [
                ...reservations.slice(0, indexToRemove),
                ...reservations.slice(indexToRemove + 1)
            ];
            setReservations(updatedReservations);
        }
    };

    return (
        <TripsClient
            reservations={reservations}
            currentUser={userContext.user}
            removeReservation={removeReservation}
        />

    );
}

export default ReservationsPage;