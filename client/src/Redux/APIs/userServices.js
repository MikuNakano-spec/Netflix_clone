import Axios from './Axios';

//Tạo user API mới
const registerService = async (user) => {
    const {data} = await Axios.post("/users", user);
    if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
    }
    return data;
};

//Đăng xuất API
const logoutService = () => {
    localStorage.removeItem("userInfo");
    return null
};

//Đăng nhập API 
const loginService = async (user) => {
    const { data } = await Axios.post("/users/login", user);
    if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
    }
    return data;
};

//Cập nhật thông tin 
const updateProfileService = async (user, token) => {
    const { data } = await Axios.post("/users", user, { headers: {Authorization: `Bearer ${token}`,},});
    if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
    }
    return data;
};

//Xóa thông tin
const deleteProfileService = async (token) => {
    const { data } = await Axios.delete("/users", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (data) {
        localStorage.removeItem("userInfo");
    }
    return data;
};

//Thay đổi mật khẩu 
const changePasswordService = async ([password], token) => {
    const { data } = await Axios.put("/users/password", password, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

//Lấy phim yêu thích 
const getFavoriteMoviesService = async (token) => {
    const {data} = await Axios.get("/users/favorites", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return data;
};

//xóa tát cả phim yêu thích
const deleteFavoriteMoviesService = async (token) => {
    const {data} = await Axios.delete("/users/favorites", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return data;
};

//thích movie api call
const likeMovieService = async (movieId, token) => {
    const { data } = await Axios.post( `/users/favorites`, movieId, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return data;
}

//Admin lấy tất cả users
const getAllUsersService = async (token) => {
    const {data} = await Axios.get("/users", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

//Admin xóa user
const deleteUserService = async (id, token) => {
    const {data} = await Axios.delete(`/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};



export {
  registerService,
  logoutService,
  loginService,
  updateProfileService,
  deleteProfileService,
  changePasswordService,
  getFavoriteMoviesService,
  deleteFavoriteMoviesService,
  getAllUsersService,
  deleteUserService,
  likeMovieService,
};
