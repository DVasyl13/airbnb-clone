import {Listing} from "./Listing";

export interface Reservation {
    id: string
    startDate: Date
    endDate: Date
    totalPrice: number
    listing: Listing
}