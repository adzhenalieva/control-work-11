const express = require('express');
const multer = require('multer');
const path = require('path');
const config = require('../config');
const nanoid = require('nanoid');
const Item = require('../models/Item');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', (req, res) => {
    Item.find()
        .then(items => {res.send(items)})
        .catch(() => res.sendStatus(500))
});

router.get('/:id', (req, res) => {
    Item.findById(req.params.id).populate({ path: 'user', select: {displayName: 'displayName', phoneNumber: 'phoneNumber'}})
        .then(item => {
            if (item) return res.send(item);
            res.sendStatus(404)
        })
        .catch(() => res.sendStatus(500));
});

router.post('/', upload.single('image'), (req, res) => {
    const itemData = req.body;
    if (req.file) {
        itemData.image = req.file.filename;
    }
    const item = new Item(itemData);
    item.save()
        .then(result => res.send(result))
        .catch(error => res.sendStatus(400).send(error));
});


module.exports = router;