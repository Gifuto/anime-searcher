import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { RootState } from "../../modules";
import { useEffect, useState } from "react";

import { getFeaturesById } from "../../modules/features/selector";
import { featuresActions } from "../../modules/features/slice";

import { Load } from "../Load/Load";

export const Details = () => {
    const [year, setYear] = useState(false);

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
            if (features.year !== null) {
                setYear(!year);
            } else {
                setYear(year);
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

    return (
        <div className="block">
            <p className="text-purple-400 text-lg mt-3">
                <span className="text-purple-600">Type:</span> {features.type}
            </p>
            {year && (
                <p className="text-purple-400 text-lg mt-3">
                    <span className="text-purple-600">Year:</span>{" "}
                    {features.year}
                </p>
            )}
            <p className="text-purple-400 text-lg mt-3">
                <span className="text-purple-600">Genres:</span>{" "}
                {features.genres
                    .map((genres: { name: string }) => genres.name)
                    .join(", ")}
            </p>
            <p className="text-purple-400 text-lg mt-3">
                <span className="text-purple-600">Score:</span> {features.score}
            </p>
            <p className="text-purple-400 text-lg mt-3">
                <span className="text-purple-600">Status:</span>{" "}
                {features.status}
            </p>
            <p className="text-purple-400 text-lg mt-3">
                <span className="text-purple-600">Rating:</span>{" "}
                {features.rating}
            </p>
            <p className="text-purple-400 text-lg mt-3">
                <span className="text-purple-600">Duration:</span>{" "}
                {features.duration}
            </p>
            <p className="text-purple-400 text-lg mt-3">
                <span className="text-purple-600">Episodes:</span>{" "}
                {features.episodes}
            </p>
            <p className="text-purple-400 text-lg mt-3">
                <span className="text-purple-600">Studios:</span>{" "}
                {features.studios
                    .map((studios: { name: string }) => studios.name)
                    .join(", ")}
            </p>
            <p className="text-purple-400 text-lg mt-3">
                <span className="text-purple-600">Producers:</span>{" "}
                {features.producers
                    .map((producers: { name: string }) => producers.name)
                    .join(", ")}
            </p>
        </div>
    );
};
