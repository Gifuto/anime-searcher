import { call, put, takeLatest } from "redux-saga/effects";

import { ANIME_API } from "../../core";
import { searchActions } from "./slice";

//@ts-ignore
function* getSearch({ payload }) {
    try {
        //@ts-ignore
        const response = yield call(ANIME_API.get, `/anime?q=${payload}`);

        yield put(searchActions.setSearch(response.data));
    } catch (error) {
        console.log(error);
    }
}

export function* watchGetSearch() {
    //@ts-ignore
    yield takeLatest(searchActions.requestSearch.type, getSearch);
}
