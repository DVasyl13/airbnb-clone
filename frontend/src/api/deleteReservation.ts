export default async function deleteReservation(id: string) {
    const response = await fetch("http://localhost:8080/api/v1/user/reservation/"+ id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('jwt'),
        },
    });
    const responseBody = await response.json();
    console.log(responseBody)
    return {response, responseBody};
}