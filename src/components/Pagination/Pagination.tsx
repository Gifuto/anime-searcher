import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

import { RootState } from "../../modules";
import { animeActions } from "../../modules/anime/slice";
import { useEffect, useState } from "react";

export const Pagination = () => {
    const dispatch = useDispatch();

    const pageCount = useSelector((state: RootState) => state.anime.allPages);

    const [adaptive, setAdaptive] = useState(false);

    const handlePageClick = (event: any) => {
        const page = event.selected + 1;
        dispatch(animeActions.setNextPage(page));
        dispatch(animeActions.requestAnime());
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 100)
    };

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
        // className="py-10 mx-16"
        <div className="sm:py-10 py-5 sm:w-[700px] mx-auto">
            <ReactPaginate
                className="flex justify-around text-violet-600 sm:text-lg text-xs items-center"
                previousClassName="sm:p-2"
                pageClassName="sm:px-3 px-1"
                activeClassName="bg-violet-600 rounded-full text-white"
                nextClassName="sm:p-2"
                breakLabel="..."
                previousLabel="< prev"
                nextLabel="next >"
                renderOnZeroPageCount={null}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                onPageChange={handlePageClick}
            />
        </div>
    );
};