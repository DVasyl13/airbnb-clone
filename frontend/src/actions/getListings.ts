import {Listing} from "../types/Listing";

export default async function getListings() {
    try {
        const response = await fetch("http://localhost:8080/api/v1/listing/all", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const responseBody : Listing[] = await response.json();
        console.log(responseBody);
        return responseBody;
    } catch (e) {
        console.log("Error:" + e)
    }

}