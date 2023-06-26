import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";

import { getFeaturesById } from "../../modules/features/selector";
import { featuresActions } from "../../modules/features/slice";
import { favoriteActions } from "../../modules/favorites/slice";

import { Navbar } from "../../components";
import { Apology, Load } from "../../components/Load/Load";

export const Anime = () => {
    const [animeTitle, setAnimeTitle] = useState("");
    const [animeFeatures, setAnimeFeatures] = useState("");
    const [animeImg, setAnimeImg] = useState("");
    const [animeTrailer, setAnimeTrailer] = useState(<></>);
    const [addFavorite, setAddFavorite] = useState(
        <span>add to favorite</span>
    );

    const dispatch = useDispatch();

    const { id } = useParams();

    const [searchParams] = useSearchParams();

    const features = useSelector((state: RootState) =>
        //@ts-ignore
        getFeaturesById(state, id)
    );

    useEffect(() => {
        const animeId = {
            id: searchParams.get("id") ?? "",
        };

        if (features) {
            if (features.title_english !== null) {
                setAnimeTitle(`${features.title} / ${features.title_english}`);
            } else {
                setAnimeTitle(`${features.title}`);
            }

            if (features.year !== null) {
                setAnimeFeatures(
                    `${features.type} / ${features.year} / ${features.genres
                        .map((genres) => genres.name)
                        .join(", ")}`
                );
            } else {
                setAnimeFeatures(
                    `${features.type} / ${features.genres
                        .map((genres) => genres.name)
                        .join(", ")}`
                );
            }

            if (features.images.jpg.image_url !== null) {
                setAnimeImg(`${features.images.jpg.image_url}`);
            } else {
                setAnimeImg(`${features.title}`);
            }

            if (features.trailer.url !== null) {
                setAnimeTrailer(
                    <div className="bg-black w-full">
                        <div className="w-[640px] mx-auto">
                            <ReactPlayer
                                controls={true}
                                url={features.trailer.url}
                                fallback={<Load />}
                            />
                        </div>
                    </div>
                );
            } else {
                setAnimeTrailer(<Apology />);
            }
        }

        if (!features) {
            //@ts-ignore
            dispatch(featuresActions.requestFeatures({ ...animeId, id }));
        }
    }, [features]);

    if (!features) {
        return <Load />;
    }

    const handleAddToFavorite = () => {
        setAddFavorite(
            <span>
                Loading<span className="animate-pulse">...</span>
            </span>
        );
        const favoriteCard: any = {
            title: animeTitle,
            id: id,
            img: features.images,
        };

        setTimeout(() => {
            dispatch(favoriteActions.addToFavorite(favoriteCard));

            setAddFavorite(<span>added to favorite</span>);
        }, 1000);
    };

    return (
        <div className="bg-slate-200 min-h-screen">
            <Navbar />
            <div className="bg-transparent pt-[100px]">
                <div className="mx-10 mt-5 py-10 bg-white drop-shadow-2xl">
                    <div className="mx-10">
                        <div className="flex">
                            <div className="">
                                <div className="max-w-xs h-[350px]">
                                    <img
                                        src={animeImg}
                                        alt={animeImg}
                                        className="max-w-xs h-auto"
                                    />
                                </div>
                                <div className="">
                                    <button
                                        onClick={handleAddToFavorite}
                                        className="bg-purple-600 p-2 rounded-md text-white hover:bg-purple-700 duration-300"
                                    >
                                        {addFavorite}
                                    </button>
                                </div>
                            </div>
                            <div className="ml-5">
                                <h2 className="line-clamp-1 text-2xl text-purple-600">
                                    {animeTitle}
                                </h2>
                                <p className="text-purple-400 text-lg mt-3">
                                    {animeFeatures}
                                </p>
                                <p className="text-purple-400 text-lg mt-3">
                                    <span className="text-purple-600">
                                        Score:
                                    </span>{" "}
                                    {features.score}
                                </p>
                                <p className="text-purple-400 text-lg mt-3">
                                    <span className="text-purple-600">
                                        Status:
                                    </span>{" "}
                                    {features.status}
                                </p>
                                <p className="text-purple-400 text-lg mt-3">
                                    <span className="text-purple-600">
                                        Rating:
                                    </span>{" "}
                                    {features.rating}
                                </p>
                                <p className="text-purple-400 text-lg mt-3">
                                    <span className="text-purple-600">
                                        Duration:
                                    </span>{" "}
                                    {features.duration}
                                </p>
                                <p className="text-purple-400 text-lg mt-3">
                                    <span className="text-purple-600">
                                        Episodes:
                                    </span>{" "}
                                    {features.episodes}
                                </p>
                                <p className="text-purple-400 text-lg mt-3">
                                    <span className="text-purple-600">
                                        Studios:
                                    </span>{" "}
                                    {features.studios
                                        .map((studios) => studios.name)
                                        .join(", ")}
                                </p>
                                <p className="text-purple-400 text-lg mt-3">
                                    <span className="text-purple-600">
                                        Producers:
                                    </span>{" "}
                                    {features.producers
                                        .map((studios) => studios.name)
                                        .join(", ")}
                                </p>
                            </div>
                        </div>
                        <div className="mt-10">
                            <p className="text-lg text-justify mt-2">
                                <span className="text-purple-600">
                                    Description:
                                </span>{" "}
                                {features.synopsis.replace(
                                    "[Written by MAL Rewrite]",
                                    ""
                                )}
                            </p>
                        </div>
                        <div className="text-lg text-justify mt-5">
                            <span className="text-purple-600">Trailer:</span>{" "}
                        </div>
                        {animeTrailer}
                    </div>
                </div>
            </div>
        </div>
    );
};
