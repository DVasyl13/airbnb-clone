import React, {useEffect, useState} from 'react';
import Container from '../../components/Container';
import ListingCard from "../../components/listing/ListingCard";
import getListings from "../../actions/getListings";
import EmptyState from "../../components/EmptyState";
import {useUser} from "../../hooks/useUser";
import {useLocation} from "react-router-dom";
import {Listing} from "../../types/Listing";
import qs from 'query-string';

const Home = () => {
    const [listings, setListings] = useState<Listing[] | undefined>(undefined);
    const userContext = useUser();
    const location = useLocation();

    useEffect(() => {
        const fetchListings = async () => {
            const lists = await getListings();
            setListings(lists);
        };
        fetchListings();
    }, []);

    if (!listings) {
        return (<></>
        );
    }

    if (listings.length === 0) {
        return (
            <EmptyState showReset/>
        );
    }

    const queryParams = qs.parse(location.search);

    const filteredListings = listings.filter(listing => {
        const { category, bathroomCount, guestCount, locationValue, roomCount } = queryParams;
        return (
            (!category || listing.category === category) &&
            (!bathroomCount || listing.bathroomCount.toString() >= bathroomCount) &&
            (!guestCount || listing.guestCount.toString() >= guestCount) &&
            (!locationValue || listing.location.value === locationValue) &&
            (!roomCount || listing.roomCount.toString() >= roomCount)
        );
    });


    if (filteredListings.length === 0) {
        return <EmptyState showReset/>;
    }

    return (
        <Container>
            <div
                className="
                    pt-60
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
                {filteredListings.map((listing: any) => (
                    <ListingCard
                        currentUser={userContext.user}
                        key={listing.id}
                        data={listing}
                    />
                ))}
            </div>
        </Container>
    );
};
export default Home;
