import { FC, PropsWithChildren, useEffect, useState } from "react";

interface Card {
    title: string;
    title_english: string;
    id: number;
    img: string;
    year: number;
    type: string;
    synopsis: string;
    genres: any
    requestFeatures: any;
}

export const Card: FC<PropsWithChildren<Card>> = ({
    title,
    title_english,
    img,
    id,
    year,
    type,
    synopsis,
    genres,
    requestFeatures,
}) => {
    const [cardTitle, setCarTitle] = useState('')
    const [cardFeatures, setCardFeatures] = useState('')

    useEffect(() => {
        if (title_english !== null) {
            setCarTitle(`${title} / ${title_english}`)
        } else {
            setCarTitle(`${title}`)
        }

        if (year !== null) {
            setCardFeatures(`${type} / ${year} / ${genres.join(", ")}`)
        } else {
            setCardFeatures(`${type} / ${genres.join(", ")}`)
        }
    }, [cardTitle, cardFeatures])

    return (
        <div onClick={() => requestFeatures(id)} className="flex w-full mb-5 duration-300 cursor-pointer">
            <div className="max-w-[200px]">
                <img src={img} alt={cardTitle} className="w-full" />
            </div>
            <div className="ml-5 w-[500px]">
                <h2 className="line-clamp-1 text-2xl text-purple-600">
                    {cardTitle}
                </h2>
                <p className="text-purple-400 text-lg mt-3">{cardFeatures}</p>
                <p className="line-clamp-6 text-lg text-justify mt-2">
                    {synopsis}
                </p>
            </div>
        </div>
    );
};
