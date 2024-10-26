import Axios from "./Axios";

//Lấy tất cả category
const getCategoriesService = async() => {
    const {data} = await Axios.get("/categories");
    return data;
};

//Tạo category mới
const createCategoryService = async(title, token) => {
    const {data} = await Axios.post("/categories", title, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

//Xóa category
const deleteCategoryService = async(id, token) => {
    const {data} = await Axios.delete(`/categories/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

//Cập nhật
const updateCategoryService = async(id, title, token) => {
    const {data} = await Axios.put(`/categories/${id}`, title, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

export {
    getCategoriesService,
    createCategoryService,
    deleteCategoryService,
    updateCategoryService,
}