import { useCallback, useEffect, FC, PropsWithChildren, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from "debounce";
import type { RootState } from "../../modules";
import { useNavigate } from "react-router-dom";

import { searchActions } from "../../modules/search/slice";
import { SearchCard } from "../SearchCard/SearchCard";
import { featuresActions } from "../../modules/features/slice";

interface Navbar {}

export const Navbar: FC<PropsWithChildren<Navbar>> = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const animeSearch = useSelector((state: RootState) => state.search.items);

    const [inputValue, setInputValue] = useState("");

    const handleSetInputValue = debounce(
        (event: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(event.target.value),
        500
    );

    const search = useCallback(
        (value: string) => {
            dispatch(searchActions.requestSearch(value));
        },
        [dispatch]
    );

    const clear = useCallback(() => {
        dispatch(searchActions.clearSearch());
    }, [dispatch]);

    const requestFeatures = useCallback(
        (id: number) => {
            setInputValue("")
            //@ts-ignore
            dispatch(featuresActions.requestFeatures({ id, navigate }));
        },
        [dispatch]
    );

    useEffect(() => {
        if (inputValue.trim() === "") {
            clear();
            return;
        }
        if (inputValue) {
            search(inputValue);
        }
    }, [inputValue]);

    return (
        <div className="fixed z-50 top-0 border-b-4 border-violet-700 w-full">
            <div className="flex justify-between items-center py-2 px-10 bg-zinc-900">
                <div className="flex">
                    <button
                        type="button"
                        className="inline-block duration-300 p-3 text-white shadow-lg hover:text-violet-700"
                    >
                        <a href="/">Home</a>
                    </button>
                    <button
                        type="button"
                        className="inline-block duration-300 p-3 text-white shadow-lg hover:text-violet-700"
                    >
                        <a href="/favorite/">Favorite</a>
                    </button>
                </div>
                <form className="relative">
                    <input
                        className="duration-300 p-1 rounded-lg border-2 border-violet-700 shadow-lg focus:shadow-violet-700 hover:shadow-violet-700 hover:px-2 hover:w-[200px] focus:w-[200px]"
                        type="text"
                        placeholder="Find anime..."
                        onChange={handleSetInputValue}
                    />
                    <div className="absolute z-10 my-4 h-[605px] overflow-auto">
                        {animeSearch?.map((item) => {
                            return (
                                <SearchCard
                                    key={item.mal_id}
                                    id={item.mal_id}
                                    img={item.images.jpg.image_url}
                                    title={item.title}
                                    title_english={item.title_english}
                                    score={item.score}
                                    requestFeatures={requestFeatures}
                                />
                            );
                        })}
                    </div>
                </form>
            </div>
        </div>
    );
};
