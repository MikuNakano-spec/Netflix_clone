import * as UserConstants from '../Constants/userConstants';

//Đăng nhập
export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case UserConstants.USER_LOGIN_REQUEST:
            return { isLoading: true };
        case UserConstants.USER_LOGIN_SUCCESS:
            return { isLoading: false, userInfo: action.payload, isSuccess: true };
        case UserConstants.USER_LOGIN_FAIL:
            return { isLoading: false, isError: action.payload };
        case UserConstants.USER_LOGIN_RESET:
            return {};
        case UserConstants.USER_LOGOUT:
            return {};
        default:
            return state;
    }
};

//Đăng ký
export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case UserConstants.USER_REGISTER_REQUEST:
            return { isLoading: true};
        case UserConstants.USER_REGISTER_SUCCESS:
            return { isLoading: false, userInfo: action.payload, isSuccess: true };
        case UserConstants.USER_REGISTER_FAIL:
            return { isLoading: false, isError: action.payload };
        case UserConstants.USER_REGISTER_RESET:
            return {};
        default:
            return state;
    }
};

//Cập nhật thông tin
export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case UserConstants.USER_UPDATE_PROFILE_REQUEST:
            return { isLoading: true};
        case UserConstants.USER_UPDATE_PROFILE_SUCCESS:
            return { isLoading: false, userInfo: action.payload, isSuccess: true };
        case UserConstants.USER_UPDATE_PROFILE_FAIL:
            return { isLoading: false, isError: action.payload };
        case UserConstants.USER_UPDATE_PROFILE_RESET:
            return {};
        default:
            return state;
    }
};

//Xóa thông tin 
export const userDeleteProfileRedicer = (state = {}, action) => {
    switch (action.type) {
        case UserConstants.USER_DELETE_PROFILE_REQUEST:
            return { isLoading: true};
        case UserConstants.USER_DELETE_PROFILE_SUCCESS:
            return { isLoading: false, isSuccess: true };
        case UserConstants.USER_DELETE_PROFILE_FAIL:
            return { isLoading: false, isError: action.payload };
        case UserConstants.USER_DELETE_PROFILE_RESET:
            return {};
        default:
            return state;
    }
};

//Thay đổi mật khẩu
export const userChangePasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case UserConstants.USER_CHANGE_PASSWORD_REQUEST:
            return { ...state, isLoading: true };
        case UserConstants.USER_CHANGE_PASSWORD_SUCCESS:
            return { ...state, isLoading: false, isSuccess: true, message: action.payload.message };
        case UserConstants.USER_CHANGE_PASSWORD_FAIL:
            return { ...state, isLoading: false, isError: action.payload };
        case UserConstants.USER_CHANGE_PASSWORD_RESET:
            return {};
        default:
            return state;
    }
};

//Lấy favorite movies
export const userGetFavoriteMoviesReducer = (state = {
    likedMovies: [],
}, action) => {
    switch (action.type) {
        case UserConstants.GET_FAVORITE_MOVIES_REQUEST:
            return { isLoading: true };
        case UserConstants.GET_FAVORITE_MOVIES_SUCCESS:
            return { isLoading: false, likedMovies: action.payload };
        case UserConstants.GET_FAVORITE_MOVIES_FAIL:
            return { isLoading: false, isError: action.payload };
        case UserConstants.GET_FAVORITE_MOVIES_RESET:
            return {};
        default:
            return state;
    }
};

//Xóa favorite movies
export const userDeleteFavoriteMoviesReducer = (state = {}, action) => {
    switch (action.type) {
        case UserConstants.DELETE_FAVORITE_MOVIES_REQUEST:
            return { isLoading: true };
        case UserConstants.DELETE_FAVORITE_MOVIES_SUCCESS:
            return { isLoading: false, isSuccess: true };
        case UserConstants.DELETE_FAVORITE_MOVIES_FAIL:
            return { isLoading: false, isError: action.payload };
        case UserConstants.DELETE_FAVORITE_MOVIES_RESET:
            return {};
        default:
            return state;
    }
};

//Admin lấy tất cả users
export const adminGetAllUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case UserConstants.GET_ALL_USERS_REQUEST:
            return { isLoading: true };
        case UserConstants.GET_ALL_USERS_SUCCESS:
            return { isLoading: false, users: action.payload };
        case UserConstants.GET_ALL_USERS_FAIL:
            return { isLoading: false, isError: action.payload };
        case UserConstants.GET_ALL_USERS_RESET:
            return { users: [],};
        default:
            return state;
    }
};

//Admin xóa users
export const adminDeleteUserReducer = (state = {}, action) => {
    switch (action.type) {
        case UserConstants.DELETE_USER_REQUEST:
            return { isLoading: true };
        case UserConstants.DELETE_USER_SUCCESS:
            return { isLoading: false, isSuccess: true };
        case UserConstants.DELETE_USER_FAIL:
            return { isLoading: false, isError: action.payload };
        case UserConstants.DELETE_USER_RESET:
            return {};
        default:
            return state;
    }
};

//user thích movie
export const userLikeMovieReducer = (state = {}, action) => {
    switch (action.type) {
        case UserConstants.LIKE_MOVIE_REQUEST:
            return { isLoading: true};
        case UserConstants.LIKE_MOVIE_SUCCESS:
            return { isLoading: false, isSuccess: true};
        case UserConstants.LIKE_MOVIE_FAIL:
            return { isLoading: false, isError: action.payload };
        case UserConstants.LIKE_MOVIE_RESET:
            return {};
        default:
            return state;
    }
}