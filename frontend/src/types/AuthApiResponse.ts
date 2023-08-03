import {AppUser} from "./AppUser";

export interface AuthApiResponse {
    token: string,
    refreshToken: string,
    user: AppUser
}