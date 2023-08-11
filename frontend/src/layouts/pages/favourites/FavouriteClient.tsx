import ListingCard from "../../../components/listing/ListingCard";
import Container from "../../../components/Container";
import Heading from "../../../components/Heading";
import React from "react";
import {AppUser} from "../../../types/AppUser";
import {Listing} from "../../../types/Listing";
import EmptyState from "../../../components/EmptyState";

interface FavoritesClientProps {
    listings: Listing[],
    currentUser?: AppUser | null,
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
    listings,
    currentUser
}) => {

    if (listings.length === 0) {
        return (
            <EmptyState
                title="No favorites found"
                subtitle="Looks like you have no favorite listings."
            />
        );
    }

    return (
        <Container>
            <br/><br/><br/><br/><br/>
            <Heading
                title="Favorites"
                subtitle="List of places you favorited!"
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
                {listings.map((listing: any) => (
                    <ListingCard
                        currentUser={currentUser}
                        key={listing.id}
                        data={listing}
                    />
                ))}
            </div>
        </Container>
    );
}

export default FavoritesClient;