export default async function deleteListingFromFavourite(listingId: string) {
    const response = await fetch("http://localhost:8080/api/v1/user/listing/favourite/"+ listingId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('jwt'),
        },
    });
    const responseBody = await response.json();
    return {response, responseBody};
}