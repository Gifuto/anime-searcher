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
        <div className={adaptive ? `py-10 mx-16` : `py-5 mx-2`}>
            <ReactPaginate
                className="flex justify-around text-violet-600"
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
