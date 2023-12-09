const mongoose = require('mongoose');

const labharthiSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    mname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    referenceName: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true
    },
    aadharCardNo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    mobileNo: {
        type: String,
        required: true,
        match: /^\d{10}$/,
    },
    typeofDisability: {
        type: String,
        required: true
    },
    precentageOfDisability: {
        type: String,
        required: true,
        min: 0,
        max: 100
    },
    dateofVisit: {
        type: Date,
        required: true
    },
    timeofVisit: {
        type: Date,
        required: true
    },
    purposeofVisit: {
        type: String,
        required: true
    },
    help: {
        help: {
            type: String,
            required: true,
        },
        helpOrganization: {
            type: String,
            required: true,
        },
        helpDate: {
            type: Date,
            required: true,
        },
    },
});

const Labharthi = mongoose.model('Labharthi', labharthiSchema);
module.exports = Labharthi;