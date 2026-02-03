const router = require('express').Router();
const Product = require('../models/Product');
const { verifyTokenAndAdmin } = require('../middleware/auth');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'coffee-shop',
    },
});

const upload = multer({ storage: storage });

// Create Product
router.post('/', verifyTokenAndAdmin, upload.single('image'), async (req, res) => {
    try {
        const newProduct = new Product({
            ...req.body,
            imageUrl: req.file.path
        });
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        console.error("Error creating product:", err);
        res.status(500).json(err);
    }
});

// Update Product
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete Product
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get Product
router.get('/find/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get All Products
router.get('/', async (req, res) => {
    const qCategory = req.query.category;
    try {
        let products;
        if (qCategory) {
            products = await Product.find({
                category: {
                    $in: [qCategory],
                },
            });
        } else {
            products = await Product.find();
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
