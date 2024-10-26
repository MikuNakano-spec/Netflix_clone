import React, { useEffect } from "react";
import SideBar from "../SideBar";
import { FaRegListAlt, FaUser } from "react-icons/fa";
import { HiViewGridAdd } from "react-icons/hi";
import Table from "../../../Components/Table";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAction } from "../../../Redux/Actions/userActions";
import toast from "react-hot-toast";
import { Empty } from "../../../Components/Notifications/Empty";
import Loader from "../../../Components/Notifications/Loader";
import { deleteMovieAction } from "../../../Redux/Actions/MoviesActions";

function DashBoard() {
  const dispatch = useDispatch();
  const {
    isLoading: catLoading,
    isError: catError,
    categories,
  } = useSelector((state) => state.categoryGetAll);
  const {
    isLoading: userLoading,
    isError: userError,
    users,
  } = useSelector((state) => state.adminGetAllUsers);
  const { isLoading, isError, movies, totalMovies } = useSelector(
    (state) => state.getAllMovies
  );

  //delete movie
  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.deleteMovie
  );

  //delete movie handler
  const deleteMovieHandler = (id) => {
    window.confirm("Bạn có chắc muốn xóa movie này ?") &&
      dispatch(deleteMovieAction(id));
  };

  useEffect(() => {
    //lấy all user
    dispatch(getAllUsersAction());
    if (isError || catError || userError || deleteError) {
      toast.error("Có gì đó không đúng!");
    }
  }, [dispatch, isError, catError, userError, deleteError]);

  //dashboard data
  const DashboardData = [
    {
      bg: "bg-orange-600",
      icon: FaRegListAlt,
      title: "Total Movies",
      total: isLoading ? "Loading..." : totalMovies || 0,
    },
    {
      bg: "bg-blue-700",
      icon: HiViewGridAdd,
      title: "Total Categories",
      total: catLoading ? "Loading..." : categories?.lenght || 0,
    },
    {
      bg: "bg-green-600",
      icon: FaUser,
      title: "Total Users",
      total: userLoading ? "Loading..." : users?.lenght || 0,
    },
  ];
  return (
    <SideBar>
      <h2 className="text-xl font-bold">Dashboard</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {DashboardData.map((data, index) => (
          <div
            key={index}
            className="p-4 rounded bg-main border-border grid grid-cols-4 gap-2"
          >
            <div
              className={`col-span-1 rounded-full h-12 w-12 flex-colo ${data.bg}`}
            >
              <data.icon />
            </div>
            <div className="col-span-3">
              <h2>{data.title}</h2>
              <p className="text-text mt-2 font-bold">{data.total}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 className="text-xl font-medium my-6 text-border">Reccent Movies</h3>
      {isLoading || deleteLoading ? (
        <Loader />
      ) : movies.length > 0 ? (
        <Table
          data={movies?.slice(0, 5)}
          admin={true}
          onDeleteHandler={deleteMovieHandler}
        />
      ) : (
        <Empty message="Empty" />
      )}
    </SideBar>
  );
}

export default DashBoard;
