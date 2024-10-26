import express from "express";
import { protect, admin } from "../middlewares/Auth.js";
import * as categoriesController from "../Controllers/CategoriesController.js";

const router = express.Router();

//***Public Router*****/
router.get("/", categoriesController.getCategories);

//***Admin Router****/
router.post("/", protect, admin, categoriesController.createCategory);
router.put("/:id", protect, admin, categoriesController.updateCategory);
router.delete("/:id", protect, admin, categoriesController.deleteCategory);


export default router;