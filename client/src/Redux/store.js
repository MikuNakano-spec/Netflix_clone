import { combineReducers, configureStore } from "@reduxjs/toolkit";
import * as User from "./Reducers/userReducers";
import * as categories from "./Reducers/CategoriesReducers";
import * as movies from "./Reducers/MoviesReducers";

const rootReducer = combineReducers({
    userLogin: User.userLoginReducer,
    userRegister: User.userRegisterReducer,
    userUpdateProfile: User.userUpdateProfileReducer,
    userDeleteProfile: User.userDeleteProfileRedicer,
    userChangePassword: User.userChangePasswordReducer,
    userGetFavoriteMovies: User.userGetFavoriteMoviesReducer,
    userDeleteFavoriteMovies: User.userDeleteFavoriteMoviesReducer,
    adminGetAllUsers: User.adminGetAllUsersReducer,
    adminDeleteUser: User.adminDeleteUserReducer,
    userLikeMovie: User.userLikeMovieReducer,

    //Category
    categoryGetAll: categories.getAllCategoriesReducer,
    categoryCreate: categories.createCategoryReducer,
    categoryUpdate: categories.updateCategoryReducer,
    categoryDelete: categories.deleteCategoryReducer,

    //Movies
    getAllMovies: movies.moviesListReducer,
    getRandomMovies: movies.moviesRandomReducer,
    getMovieById: movies.movieDetailsReducer,
    getTopRatedMovie: movies.movieTopRatedReducer,
    createReview: movies.createReviewReducer,
    deleteMovie: movies.deleteMovieReducer,
    deleteAllMovies: movies.deleteAllMoviesReducer,
    createMovie: movies.createMovieReducer,
    casts: movies.CastsReducer,
});

//lấy info của user từ locaStorage
const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
};

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
});