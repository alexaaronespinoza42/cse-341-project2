const { validationResult } = require('express-validator');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllProducts = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('products').find();
        res.status(200).json(await result.toArray());
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving products' });
    }
};

const getProductById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const productId = new ObjectId(req.params.id);
        const product = await mongodb.getDatabase().db().collection('products').findOne({ _id: productId });

        if (!product) return res.status(404).json({ error: 'Product not found' });

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving the product' });
    }
};

const createProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const product = {
            name: req.body.name,
            ubication: req.body.ubication,
            color: req.body.color,
            weight: req.body.weight,
            quantity: req.body.quantity,
            stock: req.body.stock,
            price: req.body.price,
        };
        const response = await mongodb.getDatabase().db().collection('products').insertOne(product);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Error creating the product' });
    }
};

const updateProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const productId = new ObjectId(req.params.id);

        const existingProduct = await mongodb.getDatabase().db().collection('products').findOne({ _id: productId });
        if (!existingProduct) return res.status(404).json({ error: 'Product not found' });

        const updatedFields = {
            name: req.body.name,
            ubication: req.body.ubication,
            color: req.body.color,
            weight: req.body.weight,
            quantity: req.body.quantity,
            stock: req.body.stock,
            price: req.body.price
        };

        const response = await mongodb.getDatabase().db().collection('products').updateOne(
            { _id: productId },
            { $set: updatedFields }
        );

        res.status(200).json({ message: 'Product updated successfully', updatedFields });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the product' });
    }
};


const deleteProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const productId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('products').deleteOne({ _id: productId });
        
        if (response.deletedCount === 0) return res.status(404).json({ error: 'Product not found' });
        
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting the product' });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
