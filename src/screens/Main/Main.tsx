import { useCallback, useEffect, FC, PropsWithChildren } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../modules";
import { useNavigate } from "react-router-dom";

import InfiniteScroll from "react-infinite-scroll-component";

import { animeActions } from "../../modules/anime/slice";
import { featuresActions } from "../../modules/features/slice";

import { Card } from "../../components";
import { Navbar } from "../../components";
import { Load } from "../../components/Load/Load";

interface MainProps {}

export const Main: FC<PropsWithChildren<MainProps>> = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const anime = useSelector((state: RootState) => state.anime.items);
    const hasMore = useSelector((state: RootState) => state.anime.hasNextPage);

    const requestAnime = useCallback(() => {
        dispatch(animeActions.requestAnime());
    }, [dispatch]);

    const fetchMoreData = () => {
        setTimeout(() => {
            dispatch(animeActions.requestNextAnime());
        }, 1500);
    };

    const requestFeatures = useCallback(
        (id: number) => {
            //@ts-ignore
            dispatch(featuresActions.requestFeatures({ id, navigate }));
        },
        [dispatch]
    );

    useEffect(() => {
        requestAnime();
    }, []);

    return (
        <div className="bg-slate-200">
            <Navbar />
            <div className="bg-transparent pt-[100px]">
                <div className="mx-auto w-[800px] mt-5 py-10 bg-white drop-shadow-2xl">
                    <InfiniteScroll
                        className="mx-10"
                        dataLength={anime.length}
                        hasMore={hasMore}
                        next={fetchMoreData}
                        loader={<Load />}
                    >
                        {anime.map((cards) => (
                            <Card
                                key={cards.mal_id}
                                id={cards.mal_id}
                                img={cards.images.jpg.image_url}
                                title={cards.title}
                                title_english={cards.title_english}
                                type={cards.type}
                                year={cards.year}
                                genres={cards.genres.map(
                                    (genres) => genres.name
                                )}
                                synopsis={cards.synopsis}
                                requestFeatures={requestFeatures}
                            />
                        ))}
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    );
};
