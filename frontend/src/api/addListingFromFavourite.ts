export default async function addListingFromFavourite(listingId: string) {
    const response = await fetch("http://localhost:8080/api/v1/user/listing/"+ listingId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('jwt'),
        },
    });
    const responseBody = await response.json();
    console.log(responseBody);
    return {response, responseBody};
}