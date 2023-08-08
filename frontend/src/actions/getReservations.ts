import {Reservation} from "../types/Reservation";

export default async function getReservations(id: string | undefined) {
    try {
        const response = await fetch("http://localhost:8080/api/v1/reservation/" + id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const responseBody : Reservation[] = await response.json();
        console.log(responseBody);
        return responseBody;
    } catch (e) {
        console.log("Error:" + e)
    }
}