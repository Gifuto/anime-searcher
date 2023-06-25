import { REQUEST_STATUS } from "../../core/api/types"

export interface Anime {
    mal_id: number
    title: string
    title_english: string
    images: {
        jpg: {
            image_url: string
        }
    }
    year: number
    synopsis: string
    type: string
    genres: Genres[]
}

export interface Genres {
    name: string
}

export interface Response {
    data: Anime[]
    pagination: {
        has_next_page: boolean
    }
}

export interface AnimeState {
    items: Anime[]
    nextItems: Anime[]
    status: REQUEST_STATUS
    hasNextPage: boolean
    currentPage: number
}