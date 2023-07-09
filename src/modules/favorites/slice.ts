import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { FavoriteState, Favorite } from "./types";

export const SLICE_NAME = "favorite";

const initialState: FavoriteState = {
    items: [],
};

export const favoriteSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {
        addToFavorite: (state, action: PayloadAction<Favorite>) => {
            if (state.items.find(({ id }) => id === action.payload.id)) {
                alert("it's already in my favorites")
            } else {
                const favoriteCard = {
                    title: action.payload.title,
                    id: action.payload.id,
                    img: action.payload.img,
                };
                state.items.push(favoriteCard);
            }
        },
        removeFavorite: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((item) => item.id !== action.payload)
        },
    },
});

export const favoriteActions = favoriteSlice.actions;
