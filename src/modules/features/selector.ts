import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "..";

const getId = (_: unknown, id: number) => id;

const getFeatures = (state: RootState) => state.features.items;

export const getFeaturesById = createSelector(
    getFeatures,
    getId,
    (features, id) => {
        const feature = features?.find((feature) => feature.mal_id === Number(id));

        return feature ?? null;
    }
);