import { call, put, takeLatest } from "redux-saga/effects";

import { ANIME_API } from "../../core";
import { featuresActions } from "./slice";

//@ts-ignore
function* getFeatures({ payload: { id, navigate } }) {
    try {
        //@ts-ignore
        const response = yield call(ANIME_API.get, `/anime/${id}/full`);

        const updatedFeatures = { ...response.data, id }

        yield put(featuresActions.setFeatures(updatedFeatures));

        if (navigate) {
            navigate(`/anime/${updatedFeatures.id}`)
        }

    } catch (error) {
        console.log(error);
    }
}

export function* watchGetFeatures() {
    //@ts-ignore
    yield takeLatest(featuresActions.requestFeatures.type, getFeatures);
}
