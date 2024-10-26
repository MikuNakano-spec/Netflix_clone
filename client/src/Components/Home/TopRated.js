import React, { useState } from "react";
import Titles from "./../Titles";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  BsBookmarkStarFill,
  BsCaretLeftFill,
  BsCaretRightFill,
} from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import Rating from "../Stars";
import Loader from "../Notifications/Loader";
import { Empty } from "../Notifications/Empty";
import { useDispatch, useSelector } from "react-redux";
import { IfMovieLiked, LikeMovie } from "../../Context/Functionalities";

const SwiperTop = ({ prevEl, nextEl, movies }) => {
  const { isLoading } = useSelector((state) => state.userLikeMovie);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  // nếu thích function
  const isLiked = (movie) => {
    return IfMovieLiked(movie);
  };

  return (
    <Swiper
      navigation={{ nextEl, prevEl }}
      autoplay={true}
      speed={1000}
      loop={true}
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      }}
    >
      {movies?.map((movie, index) => (
        <SwiperSlide key={index}>
          <div className="p-4 h-rate hovered border border-border bg-dry rounded-lg overflow-hidden">
            <img
              src={
                movie?.titleImage
                  ? `/images/${movie.titleImage}`
                  : "/images/user.png"
              }
              alt={movie?.name}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="hovered px-4 gap-6 absolute text-center bg-black bg-opacity-90 top-25 left-0 right-0 bottom-0">
              <button
                onClick={() => LikeMovie(movie, dispatch, userInfo)}
                disabled={isLiked(movie) || isLoading}
                className={`w-12 h-12 flex-colo transitions hover:bg-subMain rounded-full
                ${isLiked(movie) ? "bg-subMain" : "bg-white bg-opacity-30"}
                 text-white`}
              >
                <FaHeart />
              </button>
              <Link
                className="font-semibold text-xl trancuted line-clamp-2"
                to={`/movie/${movie?._id}`}
              >
                {movie?.name}
              </Link>
              <div className="flex gap-2 text-star">
                <Rating value={movie?.rate} />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

function TopRated({ movies, isLoading }) {
  const [nextEl, setNextEl] = useState(null);
  const [prevEl, setPrevtEl] = useState(null);
  const classNames =
    "hover:bg-dry transitions text-sm rounded w-8 h-8 flex-colo bg-subMain text-white";
  return (
    <div className="my-16">
      <Titles title="Top Rated" Icon={BsBookmarkStarFill} />
      <div className="mt-10">
        {isLoading ? (
          <Loader />
        ) : movies?.length > 0 ? (
          <SwiperTop nextEl={nextEl} prevEl={prevEl} movies={movies} />
        ) : (
          <Empty message="Hình như không có movies nào cả" />
        )}
        <div className="w-full px-1 flex-rows gap-6 pt-12">
          <button className={classNames} ref={(node) => setPrevtEl(node)}>
            <BsCaretLeftFill />
          </button>
          <button className={classNames} ref={(node) => setNextEl(node)}>
            <BsCaretRightFill />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopRated;
