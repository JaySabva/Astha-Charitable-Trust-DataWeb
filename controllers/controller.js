const mongoose = require('mongoose');

const labharthi = require('../models/labharthi');
const doner = require('../models/doner');
const other = require('../models/other');

exports.labharthiRegistration = async (req, res, next) => {
    try {
        const lab = new labharthi({
            fname: req.body.fname,
            mname: req.body.mname,
            lname: req.body.lname,
            referenceName: req.body.referenceName,
            dob: req.body.dob,
            aadharCardNo: req.body.aadharCardNo,
            address: req.body.address,
            mobileNo: req.body.mobileNo,
            typeofDisability: req.body.typeofDisability,
            precentageOfDisability: req.body.precentageOfDisability,
            dateofVisit: req.body.dateofVisit,
            timeofVisit: req.body.timeofVisit,
            purposeofVisit: req.body.purposeofVisit,
            help: req.body.help
        });

        await lab.save();

        return res.status(201).json({
            message: 'labharthi created',
            lab: lab
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
};

exports.labharthiView = async (req, res, next) => {
    try {
        let filter = {};
        if (req.query.fname) {
            filter.fname = {$regex: new RegExp(req.query.fname, 'i')};
        }
        if (req.query.mname) {
            filter.mname = {$regex: new RegExp(req.query.mname, 'i')};
        }
        if (req.query.lname) {
            filter.lname = {$regex: new RegExp(req.query.lname, 'i')};
        }
        if (req.query.referenceName) {
            filter.referenceName = {$regex: new RegExp(req.query.referenceName, 'i')};
        }
        if (req.query.dob) {
            filter.dob = req.query.dob;
        }
        if (req.query.aadharCardNo) {
            filter.aadharCardNo = req.query.aadharCardNo;
        }
        if (req.query.address) {
            filter.address = {$regex: new RegExp(req.query.address, 'i')};
        }
        if (req.query.mobileNo) {
            filter.mobileNo = req.query.mobileNo;
        }
        if (req.query.typeofDisability) {
            filter.typeofDisability = req.query.typeofDisability;
        }
        if (req.query.precentageOfDisability) {
            filter.precentageOfDisability = {$lte: req.query.precentageOfDisability};
        }
        if (req.query.dateofVisit) {
            filter.dateofVisit = req.query.dateofVisit;
        }
        if (req.query.timeofVisit) {
            filter.timeofVisit = req.query.timeofVisit;
        }
        if (req.query.purposeofVisit) {
            filter.purposeofVisit = {$regex: new RegExp(req.query.purposeofVisit, 'i')};
        }
        if (req.query.help) {
            filter['help.help'] = {$regex: new RegExp(req.query.help, 'i')};
        }
        if (req.query.helpOrganization) {
            filter['help.helpOrganization'] = {$regex: new RegExp(req.query.helpOrganization, 'i')};
        }
        if (req.query.helpDate) {
            filter['help.helpDate'] = req.query.helpDate;
        }

        console.log(filter);

        const users = await labharthi.find(filter);
        return res.status(200).json({
            users: users
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
};

exports.labharthiEdit = async (req, res, next) => {
    try {
        const id = req.params.id;

        await labharthi.updateOne({_id: id}, req.body).exec();
        console.log(req.body);
        return res.status(200).json({
            message: 'labharthi updated'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
};

exports.labharthiDelete = async (req, res, next) => {
    try {
        const id = req.params.id;

        await labharthi.deleteOne({_id: id}).exec();
        return res.status(200).json({
            message: 'labharthi deleted'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
}