interface FavoriteCard {
    requestFeatures: (id: number) => void
    handleRemoveFavorite: (id: number) => void
    cardsProps: {
        title: string;
        id: number;
        img: {
            jpg: {
                image_url: string;
            }
        }
    };
}

export const FavoriteCard = ({
    requestFeatures,
    handleRemoveFavorite,
    cardsProps
}: FavoriteCard) => {
    return (
        <div className="flex w-full mb-5">
            <div
                onClick={() => requestFeatures(cardsProps.id)}
                className="cursor-pointer sm:max-w-[200px] max-w-[100px]"
            >
                <img
                    src={cardsProps.img.jpg.image_url}
                    alt={cardsProps.title}
                    className="w-full"
                />
            </div>
            <div className="ml-5 sm:w-[500px] w-[235px]">
                <h2
                    onClick={() => requestFeatures(cardsProps.id)}
                    className="cursor-pointer line-clamp-1 sm:text-2xl text-lg text-purple-600"
                >
                    {cardsProps.title}
                </h2>
                <button
                    onClick={() => handleRemoveFavorite(cardsProps.id)}
                    className="bg-purple-600 sm:p-2 p-1 mt-3 rounded-md text-white hover:bg-purple-700 duration-300"
                >
                    Remove
                </button>
            </div>
        </div>
    );
};
