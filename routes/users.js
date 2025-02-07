const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const usersController = require('../controllers/users');

router.get('/', usersController.getAll);
router.get('/:id', param('id').isMongoId().withMessage('Invalid ID'), usersController.getSingle);

router.post(
    '/',
    [
        body('firstName').notEmpty().withMessage('First name is required'),
        body('lastName').notEmpty().withMessage('Last name is required'),
        body('email').isEmail().withMessage('Must be a valid email address'),
        body('favoriteColor').notEmpty().withMessage('Favorite color is required'),
        body('birthday').notEmpty().isISO8601().withMessage('Must be a valid date')
    ],
    usersController.createUser
);

router.put(
    '/:id',
    [
        param('id').isMongoId().withMessage('Invalid ID'),
        body('email').optional().isEmail().withMessage('Must be a valid email address'),
        body('name').optional().notEmpty().withMessage('Name cannot be empty')
    ],
    usersController.updateUser
);

router.delete('/:id', param('id').isMongoId().withMessage('Invalid ID'), usersController.deleteUser);

module.exports = router;