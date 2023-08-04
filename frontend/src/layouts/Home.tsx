import React, {useEffect, useState} from 'react';
import Container from '../components/Container';
import getCurrentUser from "../actions/getCurrentUser";
import {AppUser} from "../types/AppUser";
import ListingCard from "../components/listing/ListingCard";
import getListings, {IListingsParams} from "../actions/getListings";
import EmptyState from "../components/EmptyState";

interface HomeProps {
    // searchParams: IListingsParams
};

const Home = () => {
    const [listings, setListings] = useState([]);
    const [currentUser, setCurrentUser] = useState<AppUser>();

    //TODO: uncomment

    // useEffect(() => {
    //     const fetchListings = async () => {
    //         const listings = await getListings(searchParams);
    //         //setListings(listings);
    //     };
    //     fetchListings();
    // }, [searchParams]);
    //
    // useEffect(() => {
    //     const fetchCurrentUser = async () => {
    //         const currentUser = await getCurrentUser();
    //         setCurrentUser(currentUser.responseBody);
    //     };
    //     fetchCurrentUser();
    // }, []);

    if (listings.length === 0) {
        return (
            <EmptyState showReset/>
        );
    }

    return (

        <Container>
            <div
                className="
                    pt-24
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
                <p>spfasfas</p>
                {listings.map((listing: any) => (
                    <ListingCard
                        currentUser={currentUser}
                        key={listing.id}
                        data={listing}
                    />
                ))}
            </div>
        </Container>

    )
}

export default Home;
