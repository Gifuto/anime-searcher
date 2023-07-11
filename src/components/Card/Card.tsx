import { useEffect, useState } from "react";

interface Genres {
    name: string;
}
interface Card {
    requestFeatures: (id: number) => void;
    cardsProps: {
        title: string;
        title_english: string;
        mal_id: number;
        images: {
            jpg: {
                image_url: string;
            };
        };
        year: number;
        type: string;
        synopsis: string;
        genres: Genres[];
    };
}

export const Card = ({ requestFeatures, cardsProps }: Card) => {
    const [cardTitle, setCarTitle] = useState("");
    const [cardFeatures, setCardFeatures] = useState("");
    const [adaptive, setAdaptive] = useState(false);

    useEffect(() => {
        if (cardsProps.title_english !== null) {
            setCarTitle(`${cardsProps.title} / ${cardsProps.title_english}`);
        } else {
            setCarTitle(`${cardsProps.title}`);
        }

        const handleResize = () => {
            if (window.innerWidth > 500) {
                setAdaptive(!adaptive);
                if (cardsProps.year !== null) {
                    setCardFeatures(
                        `${cardsProps.type} / ${
                            cardsProps.year
                        } / ${cardsProps.genres
                            .map((genre: Genres) => genre.name)
                            .join(", ")}`
                    );
                } else {
                    setCardFeatures(
                        `${cardsProps.type} / ${cardsProps.genres
                            .map((genre: Genres) => genre.name)
                            .join(", ")}`
                    );
                }
            } else {
                setAdaptive(adaptive);
                if (cardsProps.year !== null) {
                    setCardFeatures(`${cardsProps.type} / ${cardsProps.year}`);
                } else {
                    setCardFeatures(`${cardsProps.type}`);
                }
            }
        };

        handleResize(); // Check initial screen width

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div
            onClick={() => requestFeatures(cardsProps.mal_id)}
            className="flex w-full mb-5 duration-300 cursor-pointer"
        >
            <div className="sm:max-w-[200px] max-w-[100px]">
                <img
                    src={cardsProps.images.jpg.image_url}
                    alt={cardTitle}
                    className="w-full"
                />
            </div>
            <div className="ml-5 sm:w-[500px] w-[235px]">
                <h2 className="line-clamp-1 sm:text-2xl text-lg text-purple-600">
                    {cardTitle}
                </h2>
                <p className="text-purple-400 sm:text-lg text-base mt-3">
                    {cardFeatures}
                </p>
                {adaptive ? (
                    <p className="line-clamp-6 text-lg text-justify mt-2">
                        {cardsProps.synopsis}
                    </p>
                ) : null}
            </div>
        </div>
    );
};
