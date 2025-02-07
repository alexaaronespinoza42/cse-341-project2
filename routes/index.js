const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => { 
    res.send('Welcome to my Project 2!');
});

router.use('/users', require('./users'));
router.use('/products', require('./products')); //new route added   

module.exports = router;
    