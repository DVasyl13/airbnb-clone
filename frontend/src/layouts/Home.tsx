import React, {useEffect, useState} from 'react';
import Container from '../components/Container';
import ListingCard from "../components/listing/ListingCard";
import getListings, {IListingsParams} from "../actions/getListings";
import EmptyState from "../components/EmptyState";
import {useUser} from "../hooks/useUser";

interface HomeProps {
    searchParams: IListingsParams
};

const Home =  () => {
    const [listings, setListings] = useState([]);
    const userContext = useUser();

    //TODO: uncomment

    useEffect(() => {
        const fetchListings = async () => {
            const lists = await getListings();
            setListings(lists);
        };
        fetchListings();
    }, []);



    if (listings.length === 0) {
        return (
            <EmptyState showReset/>
        );
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
                {listings.map((listing: any) => (
                    <ListingCard
                        currentUser={userContext.user}
                        key={listing.id}
                        data={listing}
                    />
                ))}
            </div>
        </Container>

    )
}

export default Home;
