import ListingCard from "../../../components/listing/ListingCard";
import Heading from "../../../components/Heading";
import Container from "../../../components/Container";
import {useNavigate} from "react-router-dom";
import React, {useCallback, useState} from "react";
import {AppUser} from "../../../types/AppUser";
import {Reservation} from "../../../types/Reservation";
import {toast} from "react-hot-toast";
import deleteReservation from "../../../api/deleteReservation";
import EmptyState from "../../../components/EmptyState";

interface TripsClientProps {
    reservations: Reservation[];
    currentUser?: AppUser | null;
    removeReservation: (id: string) => void;
}

const TripsClient: React.FC<TripsClientProps> = ({
   reservations,
   currentUser,
   removeReservation,
}) => {
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);
        deleteReservation(id).then(() => {
            toast.success('Reservation cancelled');
            removeReservation(id);
        })
            .catch((error) => {
                toast.error(error?.response?.data?.error)
            })
            .finally(() => {
                setDeletingId('');
            });
    }, []);

    if (reservations.length === 0) {
        return (
            <EmptyState
                title="No trips found"
                subtitle="Looks like you haven`t reserved any trips."
            />
        );
    }

    return (
        <Container>
            <br/><br/><br/><br/><br/>
            <Heading
                title="Trips"
                subtitle="Where you've been and where you're going"
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
                        actionLabel="Cancel reservation"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
}

export default TripsClient;