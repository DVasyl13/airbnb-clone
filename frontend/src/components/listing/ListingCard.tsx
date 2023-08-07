import React, { useCallback, useMemo } from "react";
import { format } from 'date-fns';

import HeartButton from "../HeartButton";
import Button from "../Button";
import useCountries from "../../hooks/useCountries";
import {useNavigate} from "react-router-dom";
import {AppUser} from "../../types/AppUser";
import {Reservation} from "../../types/Reservation";
import {Listing} from "../../types/Listing";
import {ILocation} from "../../types/Location";

interface ListingCardProps {
    data: Listing;
    reservation?: Reservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: AppUser | null
};

const ListingCard: React.FC<ListingCardProps> = ({
     data,
     reservation,
     onAction,
     disabled,
     actionLabel,
     actionId = '',
     currentUser,
}) => {
    const navigator = useNavigate();
    const { getByValue } = useCountries();
    const locationData : ILocation = data.location;
    const location = getByValue(locationData.value);

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if (disabled) {
                return;
            }

            onAction?.(actionId)
        }, [disabled, onAction, actionId]);

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }

        return data.price;
    }, [reservation, data.price]);

    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, 'PP')} - ${format(end, 'PP')}`;
    }, [reservation]);

    return (
        <div
            onClick={() => navigator(`/listings/${data.id}`)}
            className="col-span-1 cursor-pointer group"
        >
            <div className="flex flex-col gap-2 w-full">
                <div
                    className="
                        aspect-square
                        w-full
                        relative
                        overflow-hidden
                        rounded-xl
                    "
                >
                    <img
                        className="object-cover h-full w-full group-hover:scale-110 transition"
                        src={data.imageSrc}
                        alt="Listing"
                        style={{ objectFit: 'cover' }}
                    />
                    <div className="
                            absolute
                            top-3
                            right-3
                    ">
                        <HeartButton
                            listingId={data.id}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
                <div className="font-semibold text-lg">
                    {location?.region}, {location?.label}
                </div>
                <div className="font-light text-neutral-500">
                    {reservationDate || data.category}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">
                        $ {price}
                    </div>
                    {!reservation && (
                        <div className="font-light">night</div>
                    )}
                </div>
                {onAction && actionLabel && (
                    <Button
                        disabled={disabled}
                        small
                        label={actionLabel}
                        onClick={handleCancel}
                    />
                )}
            </div>
        </div>
    );
}

export default ListingCard;