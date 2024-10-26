import * as userConstants from "../Constants/userConstants";
import * as userAPI from "../APIs/userServices";
import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../Protection";

//Đăng nhập
const loginAction = (datas) => async (dispatch) => {
    try {
        dispatch({ type: userConstants.USER_LOGIN_REQUEST });
        const response = await userAPI.loginService(datas);
        dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_LOGIN_FAIL);
    }
};

//Đăng ký
const registerAction = (datas) => async (dispatch) => {
    try {
        dispatch({ type: userConstants.USER_REGISTER_REQUEST });
        const response = await userAPI.registerService(datas);
        dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: response });
        dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_REGISTER_FAIL);
    }
};

//Đăng xuất
const logoutAction = () => (dispatch) => {
    userAPI.logoutService();
    dispatch({ type: userConstants.USER_LOGOUT });
    dispatch({ type: userConstants.USER_LOGIN_RESET });
    dispatch({ type: userConstants.USER_REGISTER_RESET });
};

//Cập nhật
const updateProfileAction = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.USER_UPDATE_PROFILE_REQUEST });
        const response = await userAPI.updateProfileService(user,tokenProtection(getState));
        dispatch({ type: userConstants.USER_UPDATE_PROFILE_SUCCESS, payload: response });
        toast.success("Profile Updated")
        dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_UPDATE_PROFILE_FAIL);
    }
};

//Xóa thông tin
const deleteProfileAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.USER_DELETE_PROFILE_REQUEST });
        await userAPI.deleteProfileService(tokenProtection(getState));
        dispatch({ type: userConstants.USER_DELETE_PROFILE_SUCCESS});
        toast.success("Profile Deleted");
        dispatch(logoutAction());
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_DELETE_PROFILE_FAIL);
    }
};

//Đổi mật khẩu
const changePasswordAction = (password) => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.USER_CHANGE_PASSWORD_REQUEST });
        const response = await userAPI.changePasswordService (
            password,
            tokenProtection(getState)
        );
        dispatch({ type: userConstants.USER_CHANGE_PASSWORD_SUCCESS, payload: response, });
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_CHANGE_PASSWORD_FAIL);
    }
};

//Lấy favorite movies
const getFavoriteMoviesAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.GET_FAVORITE_MOVIES_REQUEST });
        const response = await userAPI.getFavoriteMoviesService(
            tokenProtection(getState)
        );
        dispatch({ type: userConstants.GET_FAVORITE_MOVIES_SUCCESS, payload: response, });
    } catch (error) {
        ErrorsAction( error, dispatch, userConstants.GET_FAVORITE_MOVIES_FAIL);
    }
};

//xóa favorite movies
const deleteFavoriteMoviesAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.DELETE_FAVORITE_MOVIES_REQUEST });
         await userAPI.deleteFavoriteMoviesService(
            tokenProtection(getState)
        );
        dispatch({ type: userConstants.DELETE_FAVORITE_MOVIES_SUCCESS });
        toast.success("All Favorite Movies Deleted");
    } catch (error) {
        ErrorsAction( error, dispatch, userConstants.DELETE_FAVORITE_MOVIES_FAIL);
    }
};

//admin lấy users 
const  getAllUsersAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.GET_ALL_USERS_REQUEST });
        const response = await userAPI.getAllUsersService(tokenProtection(getState));
        dispatch({ type: userConstants.GET_ALL_USERS_SUCCESS, payload: response, });
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.GET_ALL_USERS_FAIL );
    }
};

//delete users
const  deleteUserAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.DELETE_USER_REQUEST });
        await userAPI.deleteUserService(id, tokenProtection(getState));
        dispatch({ type: userConstants.DELETE_USER_SUCCESS, });
        toast.success("User deleted");
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.DELETE_USER_FAIL );
    }
};

// user thích movie
const likeMovieAction = (movieId) => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.LIKE_MOVIE_REQUEST});
        const response = await userAPI.likeMovieService(
            movieId,
            tokenProtection(getState)
        );
        dispatch({ type: userConstants.LIKE_MOVIE_SUCCESS, payload: response, });
        toast.success("Added to your favorites");
        dispatch(getFavoriteMoviesAction());
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.LIKE_MOVIE_FAIL);
    }
};

export {
  loginAction,
  registerAction,
  logoutAction,
  updateProfileAction,
  deleteProfileAction,
  changePasswordAction,
  getFavoriteMoviesAction,
  deleteFavoriteMoviesAction,
  getAllUsersAction,
  deleteUserAction,
  likeMovieAction,
};