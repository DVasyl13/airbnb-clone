import {ILocation} from "./Location";

export interface Listing {
    id: string
    title: string
    description: string
    imageSrc: string
    category:  string
    roomCount: number
    bathroomCount: number
    guestCount: number
    location: ILocation

    price: number
}