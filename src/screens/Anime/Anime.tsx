import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";

import { getFeaturesById } from "../../modules/features/selector";
import { featuresActions } from "../../modules/features/slice";
import { favoriteActions } from "../../modules/favorites/slice";

import { Details, Load, Navbar } from "../../components";

export const Anime = () => {
    const [animeTitle, setAnimeTitle] = useState("");
    const [animeImg, setAnimeImg] = useState("");
    const [addFavorite, setAddFavorite] = useState("add to favorite");
    const [adaptive, setAdaptive] = useState(false);
    const [checkLink, setCheckLink] = useState(false);
    const [adaptiveYTube, setAdaptiveYTube] = useState(620);

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

            if (features.images.jpg.image_url !== null) {
                setAnimeImg(`${features.images.jpg.image_url}`);
            } else {
                setAnimeImg(`${features.title}`);
            }

            if (features.trailer.url) {
                setCheckLink(!checkLink);
            } else {
                setCheckLink(checkLink);
            }
        }

        if (!features) {
            //@ts-ignore
            dispatch(featuresActions.requestFeatures({ ...animeId, id }));
        }
    }, [features]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 540) {
                setAdaptive(!adaptive);
                setAdaptiveYTube(adaptiveYTube);
            } else {
                setAdaptive(adaptive);
                setAdaptiveYTube(280);
            }
        };

        handleResize(); // Check initial screen width

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    if (!features) {
        return <Load />;
    }

    const handleAddToFavorite = () => {
        setAddFavorite("Loading...");
        const favoriteCard: any = {
            title: animeTitle,
            id: id,
            img: features.images,
        };

        setTimeout(() => {
            dispatch(favoriteActions.addToFavorite(favoriteCard));

            setAddFavorite("added to favorite");
        }, 1000);
    };

    const videoUrl = features.trailer.url

    return (
        <div className="bg-slate-200 w-full">
            <Navbar />
            <div className="bg-transparent pt-[50px] sm:pt-[100px]">
                <div className="mx-auto sm:w-[700px] mt-5 py-10 bg-white drop-shadow-2xl">
                    <div className="sm:mx-10 mx-3">
                        {adaptive ? (
                            <div className="flex">
                                <div className="w-[225px]">
                                    <div className="h-[350px] w-[225px]">
                                        <img
                                            src={animeImg}
                                            alt={animeImg}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="mt-5">
                                        <button
                                            onClick={handleAddToFavorite}
                                            className="w-full bg-purple-600 p-2 rounded-md text-white hover:bg-purple-700 duration-300"
                                        >
                                            {addFavorite}
                                        </button>
                                    </div>
                                </div>
                                <div className="ml-5">
                                    <h2 className="line-clamp-1 text-2xl text-purple-600">
                                        {animeTitle}
                                    </h2>
                                    <Details />
                                </div>
                            </div>
                        ) : (
                            <div className="">
                                <div className="">
                                    <h2 className="line-clamp-1 text-2xl text-purple-600">
                                        {animeTitle}
                                    </h2>
                                    <div className="w-full mt-5">
                                        <img
                                            src={animeImg}
                                            alt={animeImg}
                                            className="w-full h-auto"
                                        />
                                    </div>
                                    <div className="mt-5">
                                        <button
                                            onClick={handleAddToFavorite}
                                            className="w-full bg-purple-600 p-2 rounded-md text-white hover:bg-purple-700 duration-300"
                                        >
                                            {addFavorite}
                                        </button>
                                    </div>
                                </div>
                                <Details />
                            </div>
                        )}
                        <div className="my-10">
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
                    </div>
                    {checkLink && (
                        <div className="sm:mx-10">
                            <div className="text-lg text-justify mt-5">
                                <span className="text-purple-600">
                                    Trailer:
                                </span>{" "}
                            </div>
                            <div className="bg-black sm:w-[620px] w-[280] mx-auto">
                                <div className="sm:w-[620px] w-[280]">
                                    <ReactPlayer
                                        className="mx-auto"
                                        width={adaptiveYTube}
                                        controls={true}
                                        url={videoUrl}
                                        fallback={<Load />}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
