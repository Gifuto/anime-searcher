import { REQUEST_STATUS } from "../../core/api/types"

export interface Features {
    data: any
    mal_id: number
    images: {
        jpg: {
            image_url: string
        }
    }
    title: string
    title_english: string
    background: string
    duration: string
    score: number
    status: string
    episodes: number
    year: number
    type: string
    synopsis: string
    rating: string
    trailer: {
        url: string
    }
    producers: Producers[]
    studios: Studios[]
    genres: Genres[]
}

export interface Producers {
    name: string
}

export interface Genres {
    name: string
}

export interface Studios {
    name: string
}

export interface FeaturesRequest {
    id: number
    title: string
}

export interface FeaturesState {
    items: Features[]
    status: REQUEST_STATUS
}