import { useEffect, useState } from "react";
interface Card {
    title: string;
    title_english: string;
    id: number;
    img: string;
    year: number;
    type: string;
    synopsis: string;
    genres: Genres[];
    requestFeatures: any;
}

interface Genres {
    name: string;
}

export const Card = ({
    title,
    title_english,
    img,
    id,
    year,
    type,
    synopsis,
    genres,
    requestFeatures,
}: Card) => {
    const [cardTitle, setCarTitle] = useState("");
    const [cardFeatures, setCardFeatures] = useState("");
    const [adaptive, setAdaptive] = useState(false);

    const animeGenres = genres.map((genre: Genres) => genre.name)

    useEffect(() => {
        if (title_english !== null) {
            setCarTitle(`${title} / ${title_english}`);
        } else {
            setCarTitle(`${title}`);
        }

        const handleResize = () => {
            if (window.innerWidth > 500) {
                setAdaptive(!adaptive);
                if (year !== null) {
                    setCardFeatures(`${type} / ${year} / ${animeGenres.join(", ")}`);
                } else {
                    setCardFeatures(`${type} / ${animeGenres.join(", ")}`);
                }
            } else {
                setAdaptive(adaptive);
                if (year !== null) {
                    setCardFeatures(`${type} / ${year}`);
                } else {
                    setCardFeatures(`${type}`);
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
            onClick={() => requestFeatures(id)}
            className="flex w-full mb-5 duration-300 cursor-pointer"
        >
            <div className="sm:max-w-[200px] max-w-[100px]">
                <img src={img} alt={cardTitle} className="w-full" />
            </div>
            <div className="ml-5 sm:w-[500px] w-[235px]">
                <h2 className="line-clamp-1 sm:text-2xl text-lg text-purple-600">
                    {cardTitle}
                </h2>
                <p className="text-purple-400 sm:text-lg text-base mt-3">{cardFeatures}</p>
                {adaptive ? (
                    <p className="line-clamp-6 text-lg text-justify mt-2">
                        {synopsis}
                    </p>
                ) : null}
            </div>
        </div>
    );
};
