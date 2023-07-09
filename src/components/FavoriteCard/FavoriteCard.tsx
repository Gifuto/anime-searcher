interface FavoriteCard {
    title: string;
    id: number;
    img: string;
    requestFeatures: any;
    handleRemoveFavorite: any;
}

export const FavoriteCard = ({
    title,
    img,
    id,
    requestFeatures,
    handleRemoveFavorite,
}: FavoriteCard) => {
    return (
        <div className="flex w-full mb-5">
            <div
                onClick={() => requestFeatures(id)}
                className="cursor-pointer sm:max-w-[200px] max-w-[100px]"
            >
                <img src={img} alt={title} className="w-full" />
            </div>
            <div className="ml-5 sm:w-[500px] w-[235px]">
                <h2
                    onClick={() => requestFeatures(id)}
                    className="cursor-pointer line-clamp-1 sm:text-2xl text-lg text-purple-600"
                >
                    {title}
                </h2>
                <button
                    onClick={() => handleRemoveFavorite(id)}
                    className="bg-purple-600 sm:p-2 p-1 mt-3 rounded-md text-white hover:bg-purple-700 duration-300"
                >
                    Remove
                </button>
            </div>
        </div>
    );
};
