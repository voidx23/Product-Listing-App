import express from "express";
import { addCategory, getCategory, getAllCategory } from "../controller/categoryController.js";

const router = express.Router();


router.post("/addCategories", addCategory);
router.get("/getCategory", getCategory);
router.get("/getAllcategory", getAllCategory);

export default router;