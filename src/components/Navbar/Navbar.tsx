import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from "debounce";
import type { RootState } from "../../modules";
import { useNavigate } from "react-router-dom";

import { searchActions } from "../../modules/search/slice";
import { featuresActions } from "../../modules/features/slice";
//@ts-ignore
import search_icon from "../../assets/search-icon.svg";
import { SearchCard } from "..";

export const Navbar = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const animeSearch = useSelector((state: RootState) => state.search.items);

    const [inputValue, setInputValue] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [adaptive, setAdaptive] = useState(false);

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

    const requestFeatures = (id: number) => {
        setInputValue("");
        //@ts-ignore
        dispatch(featuresActions.requestFeatures({ id }));
        navigate(`/anime-searcher/anime/${id}`);
    }

    const handleVisibleInput = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsVisible(!isVisible);
        setInputValue("");
        clear();
    };

    const handleReturnHome = () => {
        navigate("/anime-searcher/");
        window.location.reload();
    };

    const handleGoFavorite = () => {
        navigate("/anime-searcher/favorite");
    };

    useEffect(() => {
        if (inputValue.trim() === "") {
            clear();
            return;
        }
        if (inputValue) {
            search(inputValue);
        }
    }, [inputValue]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 500) {
                setAdaptive(!adaptive);
            } else {
                setAdaptive(adaptive);
            }
        };

        handleResize(); // Check initial screen width

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="fixed z-50 top-0 border-b-4 border-violet-700 w-full">
            <div className="flex justify-between items-center py-2 px-5 sm:px-20 bg-zinc-900">
                {!isVisible && (
                    <div className="flex w-full">
                        <button
                            onClick={handleReturnHome}
                            type="button"
                            className="inline-block duration-300 p-3 text-white shadow-lg hover:text-violet-700"
                        >
                            Home
                        </button>
                        <button
                            onClick={handleGoFavorite}
                            type="button"
                            className="inline-block duration-300 p-3 text-white shadow-lg hover:text-violet-700"
                        >
                            Favorite
                        </button>
                    </div>
                )}
                <form className={`${isVisible ? "w-full py-1.5" : ""}`}>
                    {adaptive ? (
                        <input
                            className="w-full p-1 rounded-lg border-2 border-violet-700 shadow-lg focus:shadow-violet-700 hover:shadow-violet-700 hover:px-2"
                            type="text"
                            placeholder="Find anime..."
                            onChange={handleSetInputValue}
                        />
                    ) : (
                        <div className="flex">
                            {isVisible && (
                                <input
                                    className="w-full p-1 rounded-lg border-2 border-violet-700 shadow-lg focus:shadow-violet-700 hover:shadow-violet-700 hover:px-2"
                                    type="text"
                                    placeholder="Find anime..."
                                    onChange={handleSetInputValue}
                                />
                            )}
                            <button
                                onClick={handleVisibleInput}
                                className="w-[30px]"
                            >
                                <img src={search_icon} />
                            </button>
                        </div>
                    )}
                    {inputValue && (
                        <div className="absolute z-10 my-4 h-[605px] overflow-auto">
                            {animeSearch?.map(({ ...cardsProps }) => (
                                <SearchCard
                                    key={cardsProps.mal_id}
                                    cardsProps={cardsProps}
                                    requestFeatures={requestFeatures}
                                />
                            ))}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};
