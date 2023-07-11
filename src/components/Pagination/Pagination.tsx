import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

import { RootState } from "../../modules";
import { animeActions } from "../../modules/anime/slice";

export const Pagination = () => {
    const dispatch = useDispatch();

    const pageCount = useSelector((state: RootState) => state.anime.allPages);

    const handlePageClick = (event: any) => {
        const page = event.selected + 1;
        dispatch(animeActions.setNextPage(page));
        dispatch(animeActions.requestAnime());
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 100)
    };

    return (
        <div className="py-10 mx-16">
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
