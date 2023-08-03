import {FieldValues} from "react-hook-form";
import {AuthApiResponse} from "../types/AuthApiResponse";

export default async function doLogin(data: FieldValues) {
    const response = await fetch("http://localhost:8080/api/v1/auth/authenticate", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const responseBody: AuthApiResponse = await response.json();

    if (!responseBody) {
        throw new Error('response body is null');
    }
    console.log(responseBody);
    return { response, responseBody };
}