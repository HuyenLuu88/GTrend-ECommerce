const express = require('express');
const studentRoute = express.Router();

let StudentModel = require('../models/Student');

studentRoute.route('/').get((req, res) => {
    StudentModel.find((err, data) => {
        if (err) {
            return next(err)
        } else {
            res.json(data)
        }
    })
});

studentRoute.route('/create-student').post((req, res, next) => {
    StudentModel.create(req.body, (err, data) => {
        if (err) {
            return next(err)
        } else {
            res.json(data)
        }
    })
});

studentRoute.route('/edit-student/:id').get((req, res) => {
    StudentModel.findById(req.params.id, (err, data) => {
        if (err) {
            return next(err)
        } else {
            res.json(data)
        }
    })
});

studentRoute.route('/update-student/:id').post((req, res, next) => {
    StudentModel.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (err, data) => {
        if (err) {
            return next(err)
        } else {
            res.json(data);
            console.log('Student successfully updated!')
        }
    })
});

studentRoute.route('/delete-student/:id').delete((req, res, next) => {
    StudentModel.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            return next(err)
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
});

module.exports = studentRoute;
