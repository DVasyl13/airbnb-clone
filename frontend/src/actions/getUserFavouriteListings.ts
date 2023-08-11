import {Listing} from "../types/Listing";

export default async function getUserFavouriteListings() {
    try {
        const response = await fetch("http://localhost:8080/api/v1/user/listing/favourite", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
            }
        });
        const responseBody : Listing[] = await response.json();
        console.log(responseBody);
        return responseBody;
    } catch (e) {
        console.log("Error:" + e)
    }
}