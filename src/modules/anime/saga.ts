import { call, put, select, takeLatest } from "redux-saga/effects";

import { ANIME_API } from "../../core";
import { animeActions } from "./slice";
import { RootState } from "..";

//@ts-ignore
function* getAnime({ type }) {
    try {
        const { currentPage, hasNextPage } = yield select(
            (state: RootState) => state.anime
        );
        
        if (hasNextPage) {
            //@ts-ignore
            const response = yield call(
                ANIME_API.get,
                `/anime?page=${currentPage}`
            ); //${payload}

            yield put(animeActions.setAnime(response.data));
            
            if (type === animeActions.requestAnime.type) {
                yield put(animeActions.requestNextAnime());
            }
        }        
    } catch (error) {
        console.log(error);
    }
}

export function* watchGetAnime() {
    //@ts-ignore
    yield takeLatest(
        [animeActions.requestAnime.type, animeActions.requestNextAnime.type],
        getAnime
    );
}
