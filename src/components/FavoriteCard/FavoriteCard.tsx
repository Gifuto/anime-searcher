import { FC, PropsWithChildren } from "react";

interface FavoriteCard {
    title: string;
    id: number;
    img: string;
    requestFeatures: any;
    handleRemoveFavorite: any;
}

export const FavoriteCard: FC<PropsWithChildren<FavoriteCard>> = ({
    title,
    img,
    id,
    requestFeatures,
    handleRemoveFavorite,
}) => {
    return (
        <div className="flex w-full mb-5">
            <div
                onClick={() => requestFeatures(id)}
                className="cursor-pointer max-w-[200px]"
            >
                <img src={img} alt={title} className="w-full" />
            </div>
            <div className="ml-5 w-[500px]">
                <h2
                    onClick={() => requestFeatures(id)}
                    className="cursor-pointer line-clamp-1 text-2xl text-purple-600"
                >
                    {title}
                </h2>
                <button
                    onClick={() => handleRemoveFavorite(id)}
                    className="bg-purple-600 p-2 mt-3 rounded-md text-white hover:bg-purple-700 duration-300"
                >
                    remove
                </button>
            </div>
        </div>
    );
};
