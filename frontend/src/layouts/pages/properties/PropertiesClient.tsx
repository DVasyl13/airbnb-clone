import ListingCard from "../../../components/listing/ListingCard";
import Container from "../../../components/Container";
import Heading from "../../../components/Heading";
import {useNavigate} from "react-router-dom";
import React, {useCallback, useState} from "react";
import {toast} from "react-hot-toast";
import {Listing} from "../../../types/Listing";
import {AppUser} from "../../../types/AppUser";
import deleteListing from "../../../api/deleteListing";
import EmptyState from "../../../components/EmptyState";

interface PropertiesClientProps {
    listings: Listing[],
    currentUser?: AppUser | null,
    removeListings: (id: string) => void;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
    listings,
    currentUser, removeListings
}) => {
    const navigator = useNavigate();
    const [deletingId, setDeletingId] = useState('');

    const onDelete = useCallback((id: string) => {
        setDeletingId(id);

        deleteListing(id)
            .then(() => {
                toast.success('Listing deleted');
                removeListings(id);
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error)
            })
            .finally(() => {
                setDeletingId('');
            });

    }, [navigator]);

    if (listings.length === 0) {
        return (
            <EmptyState
                title="No properties found"
                subtitle="Looks like you have no properties."
            />
        );
    }

    return (
        <Container>
            <br/><br/><br/><br/><br/>
            <Heading
                title="Properties"
                subtitle="List of your properties"
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
                        key={listing.id}
                        data={listing}
                        actionId={listing.id}
                        onAction={onDelete}
                        disabled={deletingId === listing.id}
                        actionLabel="Delete property"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
}

export default PropertiesClient;