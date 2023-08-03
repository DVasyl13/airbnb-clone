import {AppUser} from "../types/AppUser";

//TODO: make a refresh token action also
export default async function getCurrentUser() {
    const response = await fetch("http://localhost:8080/api/v1/user", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
        },
    });

    const responseBody: AppUser = await response.json();

    if (!responseBody) {
        throw new Error('response body is null');
    }
    console.log(responseBody);
    return { response, responseBody };
}
