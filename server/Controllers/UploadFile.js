import express from "express";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import storage from "../config/firebaseStorage.js";


const Uploadrouter = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
});


Uploadrouter.post("/", upload.single("file"), async (req, res) => {
    try {
        //lấy file từ request
        const file = req.file;
        //tạo tên file
        if (file) {
            const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
            const blob = storage.file(fileName);
            const blobStream = blob.createWriteStream({
                resumable: false,
                metadata: {
                    contentType: file.mimetypem,
                },
            });
            //nếu error 
            blobStream.on("error", (error) => {
                res.status(400).json({ message: error.message });
            });
            //nếu thành công
            blobStream.on("finish", () => {
                //lấy public URL 
                const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.name}/o/${fileName}?alt=media`;
                //trả về file name và public URL 
                res.status(200).json(publicUrl);    
            });
            blobStream.end(file.buffer);
            //nếu ko có file
        } else {
            res.status(400).json({ message: "Please upload a file" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default Uploadrouter;