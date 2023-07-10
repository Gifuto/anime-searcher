import { useEffect, useState } from "react";

interface SearchCard {
    title: string;
    title_english: string;
    score: number;
    id: number;
    img: string;
    requestFeatures: any;
}

export const SearchCard = ({
    requestFeatures,
    ...cardsProps
}: any) => {
    const [cardTitle, setCarTitle] = useState('')

    useEffect(() => {
        if (cardsProps.title_english !== null) {
            setCarTitle(`${cardsProps.title} / ${cardsProps.title_english}`)
        } else {
            setCarTitle(`${cardsProps.title}`)
        }
    }, [cardTitle])

    return (
        <div
            onClick={() => requestFeatures(cardsProps.mal_id)}
            className="duration-300 bg-zinc-800 text-white hover:text-violet-500 cursor-pointer w-[200px] whitespace-nowrap overflow-hidden text-ellipsis border border-violet-700"
        >
            <div className="flex group duration-300">
                <div className="w-[200px]">
                    <img src={cardsProps.images.jpg.image_url} alt={cardTitle} className="w-full rounded-lg" />
                </div>
                <div className="px-3 rounded-lg absolute bg-violet-500 text-white hidden group-hover:block">
                    <span className="">{Math.round(cardsProps.score)}</span>
                </div>
            </div>
            <span className="w-[50px]">
                {cardTitle}
            </span>
        </div>
    );
};
