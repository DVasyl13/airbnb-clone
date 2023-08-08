import React from 'react';
import {Reservation} from "../../types/Reservation";
import {Listing} from "../../types/Listing";
import {AppUser} from "../../types/AppUser";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
};

interface ListingClientProps {
    reservations?: Reservation[] | undefined;
    listing: Listing
    currentUser?: AppUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
     listing,
     reservations = [],
     currentUser
}) => {
    return (
        <div>
            
        </div>
    );
};

export default ListingClient;