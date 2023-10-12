import Category from "../model/Category.js";
import Product from "../model/Product.js";
import multer from "multer";




export const addProducts = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        let productPictures = [];

        // if(req.files.length > 0){
        //     productPictures = req.files.map(file => {
        //         return { img: file.filename}
        //     })
        // }

        const product = new Product({ name, description, price, category});
        await product.save();
        res.status(201).json(product);
        // res.status(201).json({file:req.files, body:req.body})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const findProduct = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const products = await Product.find({ category: categoryId });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const find = async (req,res) => {
    try{
        const products = await Product.find();
        const category = await Category.find();

        res.status(201).json({products,category})
    }catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
} 