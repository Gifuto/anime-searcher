import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";

import { favoriteActions } from "../../modules/favorites/slice";
import { featuresActions } from "../../modules/features/slice";

import { FavoriteCard, Navbar } from "../../components";
import { useNavigate } from "react-router-dom";

export const Favorites = () => {
    const favorite = useSelector((state: RootState) => state.favorite.items);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const requestFeatures = useCallback(
        (id: number) => {
            //@ts-ignore
            dispatch(featuresActions.requestFeatures({ id, navigate }));
        },
        [dispatch]
    );

    const handleRemoveFavorite = (id: number) => {
        dispatch(favoriteActions.removeFavorite(id));
    };

    return (
        <div className="bg-slate-200 min-h-screen">
            <Navbar />
            <div className="bg-transparent pt-[100px]">
                <div className="mx-auto sm:w-[700px] mt-5 py-10 bg-white drop-shadow-2xl">
                    {favorite.length !== 0 ? (
                        <div className="mx-10">
                            {favorite.map((cards) => (
                                <FavoriteCard
                                    key={cards.id}
                                    id={cards.id}
                                    title={cards.title}
                                    img={cards.img.jpg.image_url}
                                    requestFeatures={requestFeatures}
                                    handleRemoveFavorite={handleRemoveFavorite}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="mx-10 h-screen">
                            <h2 className="mx-auto w-[300px] text-2xl text-purple-600">
                                Your favorites will be here
                            </h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
