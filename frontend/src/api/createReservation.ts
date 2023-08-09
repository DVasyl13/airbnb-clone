import {FieldValues} from "react-hook-form";
import getCurrentUser from "../actions/getCurrentUser";

export default async function createReservation(data: FieldValues) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        throw new Error('Current user is not existing!');
    }

    const response = await fetch("http://localhost:8080/api/v1/reservation", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('jwt'),
        },
        body: JSON.stringify(data)
    });
    const responseBody = await response.json();

    return {response, responseBody};
}