import asyncHandler from "express-async-handler";
import Categories from "../Models/CategoriesModel.js";


//***Public Controller****/
//lấy hết category 
//route GET /api/categories
//access public

const getCategories = asyncHandler(async (req, res) => {
    try {
        //tìm hết các danh mục trong DB
        const categories = await Categories.find({});
        //gửi hết categories về client
        res.json(categories);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//****Admin Controller****/
//Tạo category mới 
//route POST /api/categories
//access private/admin

const createCategory = asyncHandler(async (req, res) => {
    try {
        const { title } = req.body;
        //tạo category mới
        const category = new Categories({
            title,
        });
        //lưu category về DB
        const createdCategory = await category.save();
        //gửi về client
        res.status(201).json(createdCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//update category
//route PUT /api/categories/:id
//access private/admin

const updateCategory = asyncHandler(async (req, res) => {
    try {
        //lấy ID của category
        const category = await Categories.findById(req.params.id);
        if (category) {
            //update category title
            category.title = req.body.title || category.title;
            //lưu update vào DB
            const updatedCategory = await category.save();
            //gửi về client
            res.json(updatedCategory);
        }
        else {
            res.status(404).json({ message: "Category not found"});
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//delete category
//route DELETE /api/categories/:id
//access private/admin

const deleteCategory = asyncHandler(async (req, res) => {
    try {
        //lấy id của category
        const category = await Categories.findById(req.params.id);
        if (category) {
            //delete the category
            await category.deleteOne();
            //gửi thông báo thành công
            res.json({ message: "Category removed" });
        } else {
            res.status(404).json({ message: "Category not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export { getCategories, createCategory, updateCategory, deleteCategory, };