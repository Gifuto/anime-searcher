export interface Favorite {
    id: number
    title: string
    img: {
        jpg: {
            image_url: string
        }
    }
}

export interface FavoriteState {
    items: Favorite[]
}