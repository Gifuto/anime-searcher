import { REQUEST_STATUS } from "../../core/api/types"

export interface Search {
    mal_id: number
    title: string
    title_english: string
    images: {
        jpg: {
            image_url: string
        }
    }
    year: number
    score: number
}

export interface Response {
    data: Search[]
    pagination: any
}

export interface SearchState {
    items: Search[]
    status: REQUEST_STATUS
}