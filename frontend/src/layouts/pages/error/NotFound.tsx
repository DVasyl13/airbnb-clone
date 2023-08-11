import React from 'react';

import EmptyState from "../../../components/EmptyState";

const NotFound = () => {
    return (
        <EmptyState
            title="Uh Oh"
            subtitle="Something went wrong!"
        />
    );
}

export default NotFound;