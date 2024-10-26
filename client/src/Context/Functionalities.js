import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { likeMovieAction } from '../Redux/Actions/userActions';

// kiểm tra movie có add vào mục yêu thích không
const IfMovieLiked = (movie) => {
    const { likedMovies } = useSelector((state) => state.userGetFavoriteMovies);
    return likedMovies?.find(likedMovies => likedMovies?._id === movie?._id)
}

//movie yêu thích function
const LikeMovie = (movie,dispatch,userInfo) => {
    return !userInfo
      ? toast.error("Please Login to add favorite")
      : dispatch(likeMovieAction({
        movieId: movie._id,
      }));
};

export { IfMovieLiked, LikeMovie };