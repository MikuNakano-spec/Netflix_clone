import jwt from "jsonwebtoken";
import User from "../Models/UserModels.js";
import asyncHandler from "express-async-handler";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

//bảo mật
const protect = asyncHandler(async (req, res, next) => {
    let token;
    //kiểm tra token có tồn tại không
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            //verify tokenn
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //lấy user id từ decoded token
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }
    //nếu như token không tồn tại
    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

//admin middleware
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("Not authorized as an admin");
    }
}

export { generateToken, protect, admin };