import express from "express";
import { addProducts, find, findProduct } from "../controller/productController.js";
import multer from "multer";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});
const upload = multer({ storage })

router.get("/products/:categoryId", findProduct);
router.post("/addProducts", upload.array('productPicture'), addProducts);
router.get("/getData", find);

export default router;