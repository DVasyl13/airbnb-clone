import ListingCard from "../../../components/listing/ListingCard";
import Container from "../../../components/Container";
import Heading from "../../../components/Heading";
import React, {useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AppUser} from "../../../types/AppUser";
import {Reservation} from "../../../types/Reservation";
import EmptyState from "../../../components/EmptyState";
import {toast} from "react-hot-toast";
import deleteReservation from "../../../api/deleteReservation";

interface ReservationsClientProps {
    reservations: Reservation[],
    currentUser?: AppUser | null,
    removeReservation: (id: string) => void;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
   reservations,
   currentUser,
   removeReservation
}) => {
    const navigator = useNavigate();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        deleteReservation(id)
            .then(() => {
                toast.success('Reservation cancelled');
                removeReservation(id);
            })
            .catch(() => {
                toast.error('Something went wrong.')
            })
            .finally(() => {
                setDeletingId('');
            })

    }, [navigator]);

    if (reservations.length === 0) {
        return (
            <EmptyState
                title="No reservations found"
                subtitle="Looks like you have no reservations on your properties."
            />
        );
    }

    return (
        <Container>
            <br/><br/><br/><br/><br/>
            <Heading
                title="Reservations"
                subtitle="Bookings on your properties"
            />
            <div
                className="
                    mt-10
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                    2xl:grid-cols-6
                    gap-8
                "
            >
                {reservations.map((reservation: any) => (
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingId === reservation.id}
                        actionLabel="Cancel guest reservation"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
}

export default ReservationsClient;