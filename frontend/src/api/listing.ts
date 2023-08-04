import {FieldValues} from "react-hook-form";
import getCurrentUser from "../actions/getCurrentUser";

export default async function createListing(data: FieldValues) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        throw new Error('Current user is not existing!');
    }

    Object.keys(data).forEach((value: any) => {
        if (!data[value]) {
            throw new Error('Empty fields in form!');
        }
    });
    console.log(data);

    const response = await fetch("http://localhost:8080/api/v1/listing", {
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