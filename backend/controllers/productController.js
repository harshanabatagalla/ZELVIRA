import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

//add product
const addProduct = async (req, res) => {
    try {
        const { name, price, description, category, subCategory, sizes, bestSeller } = req.body;
        
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter(image => image !== undefined );
        let imagesUrl = await Promise.all(
            images.map(async image => {
                const result = await cloudinary.uploader.upload(image.path,{resource_type: "image"});
                return result.secure_url;
            })
        );
        
        const productData = {
            name,
            price : Number(price),
            description,
            image: imagesUrl,
            category,
            subCategory,
            sizes: sizes && JSON.parse(sizes),
            bestSeller : bestSeller === "true" ? true : false,
            date: Date.now(),
        };
        const product = new productModel(productData);
        await product.save();
        res.json({ success: true, message: "Product added successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
        
    }
}

//lsit all products
const listProducts = async (req, res) => {
}

//get product by id
const getProductById = async (req, res) => {
}

//remove product
const removeProduct = async (req, res) => {
}

//update product
const updateProduct = async (req, res) => {
}

export { addProduct, listProducts, getProductById, removeProduct, updateProduct };