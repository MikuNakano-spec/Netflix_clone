import asyncHandler from "express-async-handler";
import User from "../Models/UserModels.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/Auth.js";

//route post API user và user login
//public access
const registerUser = asyncHandler(async (req, res) => {
    const {fullName, email, password, image} = req.body;
    try {
        const userExists = await User.findOne({ email });
        //Kiểm cha xem user có tồn tại không
        if (userExists) {
            res.status(400)
            throw new Error("User already exists");
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Không thì tạo user
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            image,
        });

        //Nếu tài khoản tạo thành công chuyển dữ liệu về client
        if (user) {
            res.status(201).json({
                _id: user.id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        }

        else {
            res.status(400);
            throw new Error("Invalid user data");
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password} = req.body;
    try {
        //Tìm user trong DB
        const user = await User.findOne({ email });
        //Nếu như user tồn tại so sánh mật khẩu với hash mật khẩu rồi gửi data và token về client
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(401);
            throw new Error("Invalid email or password");
        }
    } catch (error) {
        res.status(400).json({ message:error.message });
    }
});

// ******Private controller********

//Update user profile
//route api/users/profile
//private access
const updateUserProfile = asyncHandler(async (req, res) => {
    const { fullName, email, image } = req.body;
    try {
        //Tìm user trong DB
        const user = await User.findById(req.user._id);
        //Nếu như user tồn tại cập nhật user vào DB
        if (user) {
            user.fullName = fullName || user.fullName;
            user.email = email || user.email;
            user.image = image || user.image;

            const updateUser = await user.save();
            //Gửi dữ liệu đã được cập nhật của user lên client
            res.json({
                _id: updateUser._id,
                fullName: updateUser.fullName,
                email: updateUser.email,
                image: updateUser.image,
                isAdmin: updateUser.isAdmin,
                token: generateToken(updateUser._id),
            });

        }
        //nếu không gửi error message
        else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

//Delete user
//route delete api/users
//private access
const deleteUserProfile = asyncHandler(async (req, res) => {
    try {
        //tìm user in DB
        const user = await User.findById(req.user._id);
        //nếu user tồn tại xóa
        if (user) {
            //Nếu user là admin thông báo lỗi
            if (user.isAdmin) {
                res.status(400);
                throw new Error("Can't delete this user");
            }
            //Còn không thì xóa user khỏi DB
            await user.deleteOne();
            res.json({ message: "User deleted successfuly" });
        }
        //còn không báo lỗi
        else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Thay đổi user mật khẩu
//route PUT /api/users/password
//private access
const changeUserPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        //tìm user trong DB
        const user = await User.findById(req.user._id);
        //nếu như user tồn tại so sánh mật khẩu cũ với hash password rồi cập nhật mật khẩu lên DB
        if (user && (await bcrypt.compare(oldPassword, user.password))){
            //mật khẩu hash mới
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashedPassword;
            await user.save();
            res.json({ message: "Password changed !" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//lấy những bộ phim được yêu thích
//route GET /api/users/favorites
//private access
const getLikedMovies = asyncHandler(async (req, res) => {
    try {
        //tìm user trong DB
        const user = await User.findById(req.user._id).populate("likedMovies");
        //nếu user tồn tại gửi liked movie tới client 
        if (user) {
            res.json(user.likedMovies);
        }
        //còn không thông báo lỗi
        else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Thêm movie vào thư mục yêu thích
//route POST /api/users/favorites
//private access
const addLikedMovies = asyncHandler(async (req, res) => {
    const { movieId } = req.body;
    try {
        //tìm user ID
        const user = await User.findById(req.user._id);
        //nếu user tồn tại thêm movie yêu thích vào db
        if (user) {
            //kiểm tra movie đã yêu thích chưa 
            //nếu movie đã yêu thích rồi thông báo lỗi
            if (user.likedMovies.includes(movieId)) {
                res.status(400);
                throw new Error("Movie already liked");
            }
            //còn không add movie vào danh sách yêu thích và lưu vào DB
            user.likedMovies.push(movieId);
            await user.save();
            res.json(user.likedMovies);
        }
        //còn không thì báo lỗi
        else {
            res.status(404);
            throw new Error("Movie not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Xóa hết movie khỏi danh sách yêu thích
//route DELETE /api/users/favorites
//private access
const deleteLikedMovies = asyncHandler(async (req, res) => {
    try {
        //tìm user trong db
        const user = await User.findById(req.user._id);
        //nếu user tồn tại xóa hết movie yêu thích
        if (user) {
            user.likedMovies = [];
            await user.save();
            res.json({ message: "All favorites movie deleted successfuly" });
        }
        //else thông báo lỗi
        else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//*****Admin Controller*****/
//Lấy hết thông tin user
//route GET /api/users
//Private admin access
const getUsers = asyncHandler(async (req, res) => {
    try {
        //tìm hết user trong DB
        const users = await User.find({});
    res.json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Delete user
//route DELETE /api/users/:id
//Private admin access
const deleteUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        //nếu user tồn tại thì xóa
        if (user) {
            //nếu user là admin thông báo lỗi
            if (user.isAdmin) {
                res.status(400);
                throw new Error("Can't delete this user");
            }
            //else xóa user khỏi DB
            await user.deleteOne();
            res.json({ messaage: "User deleted successfully" });
        }
        //else send báo lỗi
        else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export { 
    registerUser, 
    loginUser, 
    updateUserProfile, 
    deleteUserProfile, 
    changeUserPassword, 
    getLikedMovies, 
    addLikedMovies, 
    deleteLikedMovies,
    getUsers,
    deleteUser,
};