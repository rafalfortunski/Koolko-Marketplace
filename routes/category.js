const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Listings = require('../models/listings');

router.get('/:category_slug', (req, res) => {
    res.render('category');
    const category = req.params.category_slug;
    console.dir(category);

    Listings.find({ 'category_slug': category})
    .then(console.log(listings.product.name, listings.price));

});

module.exports = router;