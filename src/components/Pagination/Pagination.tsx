import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

import { RootState } from "../../modules";
import { animeActions } from "../../modules/anime/slice";

export const Pagination = () => {
    const dispatch = useDispatch();

    const allPages = useSelector((state: RootState) => state.anime.allPages);
    const currentPage = useSelector((state: RootState) => state.anime.currentPage);

    const handlePageClick = ({ selected }: { selected: number }) => {
        const pageNumber = selected + 1
        dispatch(animeActions.setNextPage(pageNumber));
        dispatch(animeActions.requestAnime());
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
    };

    return (
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
                pageCount={allPages}
                onPageChange={handlePageClick}
                forcePage={currentPage - 1}
            />
        </div>
    );
};
