const express = require('express');
const multer = require('multer');
const path = require('path');
const config = require('../config');
const nanoid = require('nanoid');
const Item = require('../models/Item');
const auth = require('../middleware/auth');

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
    if (req.query.category) {
        Item.find({category: req.query.category})
            .then(items => {
                if (items) return res.send(items);
                res.sendStatus(404)
            })
            .catch(() => res.sendStatus(500));
    } else {
        Item.find()
            .then(items => {
                res.send(items)
            })
            .catch(() => res.sendStatus(500))
    }

});

router.get('/:id', (req, res) => {
    Item.findById(req.params.id).populate({
        path: 'user',
        select: {displayName: 'displayName', phoneNumber: 'phoneNumber'}
    })
        .then(item => {
            if (item) return res.send(item);
            res.sendStatus(404)
        })
        .catch(() => res.sendStatus(500));
});

router.post('/', upload.single('image'), auth, async (req, res) => {
    const itemData = req.body;
    if (req.file) {
        itemData.image = req.file.filename;
    }
    const item = await new Item(itemData);
    item.user = req.user._id;
    if (item.price < 0 || item.price === 0) {
        res.status(500).send({message: "Price cannot be 0 or less than 0"})
    }
    item.save()
        .then(result => res.send(result))
        .catch(error => res.status(400).send(error));
});

router.delete('/:id', auth, async (req, res) => {
    const item = await Item.findById(req.params.id);

        Item.deleteOne({_id: item._id})
            .then(() => res.send({message: "Success"}))
            .catch(() => res.sendStatus(500))


});


module.exports = router;