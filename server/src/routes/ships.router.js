const express = require('express'),
debug = require('debug')('index:shipsRouter'),
shipRouter = express.Router(),
storage = require('../helpers/storage');

// Ship model
let Ship = require('../models/ship.model');


// Add Ship
shipRouter.route('/create').post(storage, (req, res, next) => {
    const { name, imo, type, owner, email } = req.body;
    const files = req.files;
    let pictures = [];

    if(Array.isArray(files) && files.length > 0) {
        for (let index = 0; index < files.length; index++) {
            const element = files[index];
            pictures.push({path: `http://localhost:3000/uploads/${element.filename}`});
        }
    }

    const ship = new Ship({name, imo, type, owner, email, pictures});

    Ship.create(ship, (error, data) => {
        if(error) {
            debug(`Error: ${error}`);
            return next(error);
        }
        else {
            debug(`Success: ${data}`);
            res.json(data);
        }
    });
});

// Get ALL Ships
shipRouter.route('/').get((req, res) => {
    Ship.find((error, data) => {
        if(error) {
            debug(`Error: ${error}`);
            return next(error);
        }
        else {
            debug(`Success: ${data}`);
            res.json(data);
        }
    });
});

// Get SINGLE Ship
shipRouter.route('/read/:id').get((req, res) => {
    Ship.findById(req.params.id, (error, data) => {
        if(error) {
            debug(`Error: ${error}`);
            return next(error);
        }
        else {
            debug(`Success: ${data}`);
            res.json(data);
        }
    });
});

// Update ship
shipRouter.route('/update/:id').patch(storage, (req, res, next) => {
    const { name, imo, type, owner, email } = req.body;
    const files = req.files;
    let pictures = [];

    if(Array.isArray(files) && files.length > 0) {
        for (let index = 0; index < files.length; index++) {
            const element = files[index];
            pictures.push({path: `http://localhost:3000/uploads/${element.filename}`});
        }
    }

     Ship.findByIdAndUpdate(req.params.id, 
    {
        $set: { name, imo, type, owner, email },
        $push: { pictures: pictures }
    }, 
    (error, data) => {
        if(error) {
            debug(`Error: ${error}`);
            return next(error);
        }
        else {
            debug(`Success: ${data}`);
            res.json(data);
        }
    });
});

// Delete ship
shipRouter.route('/delete/:id').delete((req, res, next) => {
    Ship.findByIdAndRemove(req.params.id, (error, data) => {
        if(error) {
            debug(`Error: ${error}`);
            return next(error);
        }
        else {
            res.status(200).json({
                msg: data
            });
        }
    });
});

module.exports = shipRouter;