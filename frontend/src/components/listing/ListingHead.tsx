import useCountries from "../../hooks/useCountries";
import Heading from "../Heading";
import {AppUser} from "../../types/AppUser";
import HeartButton from "../HeartButton";
import {ILocation} from "../../types/Location";
import React from "react";

interface ListingHeadProps {
    title: string;
    locationValue: ILocation;
    imageSrc: string;
    id: string;
    currentUser?: AppUser | null
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title, locationValue,
    imageSrc,
    id,
    currentUser
}) => {
    const { getByValue } = useCountries();

    const location = getByValue(locationValue.value);

    return (
        <>
            <Heading
                title={title}
                subtitle={`${location?.region}, ${location?.label}`}
            />
            <div className="
                    w-full
                    h-[60vh]
                    overflow-hidden
                    rounded-xl
                    relative
            "
            >
                <img
                    src={imageSrc}
                    className="object-cover w-full"
                    alt="Image"
                />
                <div
                    className="
                        absolute
                        top-5
                        right-5
                    "
                >
                    <HeartButton
                        listingId={id}
                        currentUser={currentUser}
                    />
                </div>
            </div>
        </>
    );
}
export default ListingHead;