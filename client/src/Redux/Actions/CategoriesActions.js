import * as CategoriesConstants from "../Constants/CategoriesConstants";
import * as categoriesAPI from "../APIs/CategoriesService";
import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../Protection";

//Get all categories
export const getAllCategoriesAction = () => async (dispatch) => {
    try {
        dispatch({ type: CategoriesConstants.GET_ALL_CATEGORIES_REQUEST });
        const data = await categoriesAPI.getCategoriesService();
        dispatch({ type: CategoriesConstants.GET_ALL_CATEGORIES_SUCCESS, payload: data });
    } catch (error) {
        ErrorsAction(error, dispatch, CategoriesConstants.GET_ALL_CATEGORIES_FAIL);
    }
};

//create
export const createCategoryAction = (title) => async (dispatch, getState) => {
    try {
        dispatch({ type: CategoriesConstants.CREATE_CATEGORY_REQUEST });
        await categoriesAPI.createCategoryService(title, tokenProtection(getState));
        dispatch({ type: CategoriesConstants.CREATE_CATEGORY_SUCCESS});
        toast.success("Category created successfully");
    } catch (error) {
        ErrorsAction(error, dispatch, CategoriesConstants.CREATE_CATEGORY_FAIL);
    }
};

//update
export const updateCategoryAction = (id, title) => async (dispatch, getState) => {
    try {
        dispatch({ type: CategoriesConstants.UPDATE_CATEGORY_REQUEST });
        await categoriesAPI.updateCategoryService(id, title, tokenProtection(getState));
        dispatch({ type: CategoriesConstants.UPDATE_CATEGORY_SUCCESS});
        toast.success("Category updated successfully");
        dispatch(getAllCategoriesAction());
    } catch (error) {
        ErrorsAction(error, dispatch, CategoriesConstants.UPDATE_CATEGORY_FAIL);
    }
};

//delete
export const deleteCategoryAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: CategoriesConstants.DELETE_CATEGORY_REQUEST });
        await categoriesAPI.deleteCategoryService(id, tokenProtection(getState));
        dispatch({ type: CategoriesConstants.DELETE_CATEGORY_SUCCESS});
        toast.success("Category deleted successfully");
        dispatch(getAllCategoriesAction());
    } catch (error) {
        ErrorsAction(error, dispatch, CategoriesConstants.DELETE_CATEGORY_FAIL);
    }
};