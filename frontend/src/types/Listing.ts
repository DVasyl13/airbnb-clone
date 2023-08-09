import {ILocation} from "./Location";
import {SmallUser} from "./SmallUser";

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
    createdAt: Date
    updatedAt: Date
    price: number
    user: SmallUser
}