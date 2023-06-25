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
            const favoriteCard = {
                title: action.payload.title,
                id: action.payload.id,
                img: action.payload.img,
            };
            const item = state.items.find((item) => item.id);
            if (item?.id !== favoriteCard.id) {
                state.items.push(favoriteCard);
            }
        },
        removeFavorite: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((item) => item.id !== action.payload)
        },
    },
});

export const favoriteActions = favoriteSlice.actions;
