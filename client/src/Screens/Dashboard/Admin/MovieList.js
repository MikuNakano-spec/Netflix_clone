import React, { useEffect } from "react";
import SideBar from "../SideBar";
import Table from "../../../Components/Table";
import { MoviesData } from "../../../Data/MovieData";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  deleteAllMoviesAction,
  deleteMovieAction,
  getAllMoviesAction,
} from "../../../Redux/Actions/MoviesActions";
import Loader from "../../../Components/Notifications/Loader";
import { Empty } from "../../../Components/Notifications/Empty";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";

function MoviesList() {
  const dispatch = useDispatch();
  const sameClass =
    "text-white p-2 rounded font-semibold border-2 border-subMain hover:border-subMain";
  //lấy tất cả movies
  const { isLoading, isError, movies, pages, page } = useSelector(
    (state) => state.getAllMovies
  );
  //delete movie
  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.deleteMovie
  );
  //delete all
  const { isLoading: allLoading, isError: allError } = useSelector(
    (state) => state.deleteAllMovies
  );

  //delete movie handler
  const deleteMovieHandler = (id) => {
    window.confirm("Bạn có chắc muốn xóa movie này ?") &&
      dispatch(deleteMovieAction(id));
  };

  //delete all movie handler
  const deleteAllMoviesHandler = () => {
    window.confirm("Bạn có chắc muốn xóa hết tất cả movie này ?") &&
      dispatch(deleteAllMoviesAction());
  };

  useEffect(() => {
    dispatch(getAllMoviesAction({}));
    if (isError || deleteError || allError) {
      toast.error(isError || deleteError || allError);
    }
  }, [dispatch, isError, deleteError, allError]);

  const nextPage = () => {
    dispatch(
      getAllMoviesAction({
        pageNumber: page + 1,
      })
    );
  };
  const prevPage = () => {
    dispatch(
      getAllMoviesAction({
        pageNumber: page - 1,
      })
    );
  };

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Movies List</h2>
          {movies?.length > 0 && (
            <button
              disabled={allLoading}
              onClick={deleteAllMoviesHandler}
              className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded"
            >
              {allLoading ? "Deleting..." : "Delete All"}
            </button>
          )}
        </div>
        {isLoading || deleteLoading ? (
          <Loader />
        ) : movies?.length > 0 ? (
          <>
            <Table
              data={MoviesData}
              admin={true}
              onDeleteHandler={deleteMovieHandler}
            />
            <div className="w-full flex-rows gap-6 my-5">
              <button
                onClick={prevPage}
                disabled={page === 1}
                className={sameClass}
              >
                <TbPlayerTrackPrev className="text-xl" />
              </button>
              <button
                onClick={nextPage}
                disabled={page === pages}
                className={sameClass}
              >
                <TbPlayerTrackNext className="text-xl" />
              </button>
            </div>
          </>
        ) : (
          <Empty message="No movies found " />
        )}
      </div>
    </SideBar>
  );
}

export default MoviesList;
