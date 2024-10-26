import express from "express";
import { addLikedMovies, changeUserPassword, deleteLikedMovies, deleteUser, deleteUserProfile, getLikedMovies, getUsers, loginUser, registerUser, updateUserProfile } from "../Controllers/UserController.js";
import { protect, admin } from "../middlewares/Auth.js";

const router = express.Router();
//public router
router.post("/", registerUser);
router.post("/login", loginUser);
//private router
router.put("/", protect, updateUserProfile);
router.delete("/", protect, deleteUserProfile);
router.put("/password", protect, changeUserPassword);
router.get("/favorites", protect, getLikedMovies);
router.post("/favorites", protect, addLikedMovies);
router.delete("/favorites", protect, deleteLikedMovies);

//admin router
router.get("/", protect, admin, getUsers);
router.delete("/:id", protect, admin, deleteUser);

export default router;