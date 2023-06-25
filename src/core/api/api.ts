import axios from "axios"

export const ANIME_API_URL = "https://api.jikan.moe/v4" 
//@ts-ignore
export const KEY = import.meta.env.VITE_KEY

export const ANIME_API = axios.create({
    baseURL: ANIME_API_URL,
})