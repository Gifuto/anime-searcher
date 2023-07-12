import { useDispatch as useReduxDispatch } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import { all } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";

import { animeSlice, SLICE_NAME as ANIME } from "./anime/slice";
import { watchGetAnime as watchGetAnimeSaga } from "./anime/saga";

import { featuresSlice, SLICE_NAME as FEATURES } from "./features/slice";
import { watchGetFeatures as watchGetFeaturesSaga } from "./features/saga";

import { searchSlice, SLICE_NAME as SEARCH } from "./search/slice";
import { watchGetSearch as watchGetSearchSaga } from "./search/saga";

import { favoriteSlice, SLICE_NAME as FAVORITE } from "./favorites/slice";

export const rootReducer = combineReducers({
    [ANIME]: animeSlice.reducer,
    [FEATURES]: featuresSlice.reducer,
    [SEARCH]: searchSlice.reducer,
    [FAVORITE]: favoriteSlice.reducer,
});

const persistConfig = {
    key: "root",
    storage: storage,
    whitelist: [FAVORITE, ANIME],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

function* rootSaga() {
    yield all([
        watchGetAnimeSaga(),
        watchGetFeaturesSaga(),
        watchGetSearchSaga(),
    ]);
}

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: false,
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(sagaMiddleware),
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export const useDispatch: () => AppDispatch = useReduxDispatch;

export type RootState = ReturnType<typeof store.getState>;
