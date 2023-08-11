import {Reservation} from "../types/Reservation";

export default async function getReservationsByUserListings() {
    try {
        const response = await fetch("http://localhost:8080/api/v1/user/listing/reservation", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
            }
        });
        const responseBody : Reservation[] = await response.json();
        console.log(responseBody);
        return responseBody;
    } catch (e) {
        console.log("Error:" + e)
    }
}