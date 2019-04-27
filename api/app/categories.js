const express = require('express');

const Categories = require('../models/Category');

const router = express.Router();

router.get('/', (req, res) => {
    Categories.find()
        .then(categories => res.send(categories))
        .catch(() => res.sendStatus(500))
});

router.post('/', (req, res) => {
    const category = new Categories(req.body);
    category.save()
        .then(result => res.send(result))
        .catch(() => res.sendStatus(400).send(error))
});

module.exports = router;