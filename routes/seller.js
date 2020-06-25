const express = require('express');
const router = express.Router();

// Get panel page
router.get('/', (req, res) => {
    res.render('seller-home', {layout: 'seller'}); 
 });

router.get('/produkty', (req, res) => {
    res.render('seller-products', {title: 'Koolko - Profile wysyłek', layout: 'seller'});
});
router.get('/zamowienia', (req, res) => {
    res.render('seller-orders', {title: 'Koolko - Profile wysyłek', layout: 'seller'});
});


module.exports = router;