import ListingCard from "../../components/listing/ListingCard";
import Heading from "../../components/Heading";
import Container from "../../components/Container";
import {useNavigate} from "react-router-dom";
import React, {useCallback, useState} from "react";
import {AppUser} from "../../types/AppUser";
import {Reservation} from "../../types/Reservation";
import {toast} from "react-hot-toast";
import deleteReservation from "../../api/deleteReservation";

interface TripsClientProps {
    reservations: Reservation[],
    currentUser?: AppUser | null,
}

const TripsClient: React.FC<TripsClientProps> = ({
     reservations,
     currentUser
}) => {
    const navigator = useNavigate();
    const [deletingId, setDeletingId] = useState('');

    //TODO: not deleting :(
    const onCancel = useCallback((id: string) => {
        setDeletingId(id);
        deleteReservation(id).then(() => {
            toast.success('Reservation cancelled');
            navigator(0);
        })
            .catch((error) => {
                toast.error(error?.response?.data?.error)
            })
            .finally(() => {
                setDeletingId('');
            });
    }, [navigator]);

    return (
        <Container>
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