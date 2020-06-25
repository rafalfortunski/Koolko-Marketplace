const express = require('express');
const router = express.Router();
const Listings = require('../models/listings');

router.get('/:id', (req, res) => {
    res.render('listing', {title: 'Koolko - Strona produktu'});
});

module.exports = router;