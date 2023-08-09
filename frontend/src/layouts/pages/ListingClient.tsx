import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Reservation} from "../../types/Reservation";
import {Listing} from "../../types/Listing";
import {AppUser} from "../../types/AppUser";
import {Range} from "react-date-range"
import {categories} from "../../components/navbar/Categories";
import useLoginModal from "../../hooks/useLoginModal";
import {useNavigate} from "react-router-dom";
import {differenceInDays, eachDayOfInterval} from "date-fns";
import Container from "../../components/Container";
import ListingHead from "../../components/listing/ListingHead";
import ListingInfo from "../../components/listing/ListingInfo";
import ListingReservation from "../../components/listing/ListingReservation";
import createReservation from "../../api/createReservation";
import {toast} from "react-hot-toast";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
};

interface ListingClientProps {
    reservations?: Reservation[] | undefined;
    listing: Listing,
    currentUser?: AppUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    reservations = [],
    currentUser
}) => {
    const loginModal = useLoginModal();
    const navigator = useNavigate();

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservation: any) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });

            dates = [...dates, ...range];
        });

        return dates;
    }, [reservations]);

    const category = useMemo(() => {
        return categories.find((items) =>
            items.label === listing.category);
    }, [listing.category]);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const onCreateReservation = useCallback(() => {
            if (!currentUser) {
                return loginModal.onOpen();
            }
            setIsLoading(true);

            createReservation({
                totalPrice,
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
                id: listing?.id
            })
                .then(() => {
                    toast.success('Listing reserved!');
                    setDateRange(initialDateRange);
                    navigator('/trips');
                })
                .catch(() => {
                    toast.error('Something went wrong.');
                })
                .finally(() => {
                    setIsLoading(false);
                })
        },
        [
            totalPrice,
            dateRange,
            listing?.id,
            navigator,
            currentUser,
            loginModal
        ]);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInDays(
                dateRange.endDate,
                dateRange.startDate
            );

            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price);
            } else {
                setTotalPrice(listing.price);
            }
        }
    }, [dateRange, listing.price]);

    return (
        <Container>
            <div
                className="
                    max-w-screen-lg
                    mx-auto
                "
            >
                <div className="flex flex-col gap-6">
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.location}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    <div
                        className="
                            grid
                            grid-cols-1
                            md:grid-cols-7
                            md:gap-10
                            mt-6
                        "
                    >
                        <ListingInfo
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            locationValue={listing.location.value}
                        />
                        <div
                            className="
                                order-first
                                mb-10
                                md:order-last
                                md:col-span-3
                            "
                        >
                            <ListingReservation
                                price={listing.price}
                                totalPrice={totalPrice}
                                onChangeDate={(value) => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ListingClient;