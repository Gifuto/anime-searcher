import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../modules";
import { useNavigate } from "react-router-dom";

import { animeActions } from "../../modules/anime/slice";
import { featuresActions } from "../../modules/features/slice";

import { Card, Pagination } from "../../components";
import { Navbar } from "../../components";
import { Load } from "../../components/Load/Load";

export const Main = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const anime = useSelector((state: RootState) => state.anime.items);

    const requestAnime = useCallback(() => {
        dispatch(animeActions.requestAnime());
    }, [dispatch]);

    const requestFeatures = (id: number) => {
        //@ts-ignore
        dispatch(featuresActions.requestFeatures({ id }));
        navigate(`/anime-searcher/anime/${id}`);
    };

    useEffect(() => {
        requestAnime();
    }, []);

    if (!anime) {
        return (
            <Load />
        )
    }

    return (
        <div className="w-full bg-slate-200">
            <Navbar />
            <div className="bg-transparent pt-[50px] sm:pt-[100px]">
                <div className="mx-auto sm:w-[700px] mt-5 py-10 bg-white drop-shadow-2xl">
                    <div className="sm:mx-10 mx-5">
                        {anime.map(({ ...cardsProps }) => (
                            <Card
                                key={cardsProps.mal_id}
                                cardsProps={cardsProps}
                                requestFeatures={requestFeatures}
                            />
                        ))}
                    </div>
                    
                </div>
                <Pagination />
            </div>
        </div>
    );
};
