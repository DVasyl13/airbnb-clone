import React, {useEffect, useState} from 'react';
import TripsClient from "./TripsClient";
import getReservationsByUser from "../../../actions/getReservationsByUser";
import {useUser} from "../../../hooks/useUser";
import {Reservation} from "../../../types/Reservation";

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

    // Important
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

export default TripsPage;