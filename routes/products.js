const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const productsController = require('../controllers/products');

const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', productsController.getAllProducts);
router.get('/:id', param('id').isMongoId().withMessage('Invalid ID'), productsController.getProductById);

router.post(
    '/',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('ubication').notEmpty().withMessage('Ubication is required'),
        body('color').notEmpty().withMessage('Color is required'),
        body('weight').isNumeric().withMessage('Weight must be a number'),
        body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
        body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
        body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number')
    ],
    isAuthenticated, productsController.createProduct
);

router.put(
    '/:id',
    [
        param('id').isMongoId().withMessage('Invalid ID'),
        body('name').optional().notEmpty().withMessage('Name cannot be empty'),
        body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number')
    ],
    isAuthenticated, productsController.updateProduct
);

router.delete('/:id', param('id').isMongoId().withMessage('Invalid ID'), isAuthenticated, productsController.deleteProduct);

module.exports = router;